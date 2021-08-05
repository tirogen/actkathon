import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthCredentialsDto, AuthResponseDto, ChangePasswordDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async validateUser(credentials: AuthCredentialsDto): Promise<User> {
    const { email, password } = credentials;
    const user: User = await this.userService.findByEmail(email, true);
    if (user && compareSync(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(credential: AuthCredentialsDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(credential);
    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }
    if (!user.isActive) {
      throw new ForbiddenException('Account is disabled by team');
    }
    const access_token = this.jwtService.sign({ userId: user._id });
    return { access_token };
  }

  async register(user: User): Promise<AuthResponseDto> {
    const existedUser = await this.userService.findByEmail(user.email);
    const credentials = { email: user.email, password: user.password };
    if (existedUser) {
      throw new BadRequestException('Email already existed');
    }
    await this.userService.create(user);
    return this.login(credentials);
  }

  async changePassword(dto: ChangePasswordDto): Promise<AuthResponseDto> {
    const { newPassword, ...authDto } = dto;
    const user = await this.validateUser(authDto);
    if (!user) {
      throw new UnauthorizedException('Wrong username or password');
    }
    await this.userService.changePassword(String(user._id), newPassword);
    return this.login({ email: user.email, password: newPassword });
  }
}
