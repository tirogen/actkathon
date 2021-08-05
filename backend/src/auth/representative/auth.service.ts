import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto, AuthResponseDto } from 'src/auth/auth.dto';
import { UserRole } from 'src/constant/user.enum';
import { Representative } from 'src/user/representative/user.schema';
import { UserService } from 'src/user/representative/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly representativeService: UserService) {}

  // TODO Upgrade validation in the future
  async validateUser(credentials: AuthCredentialsDto): Promise<Representative> {
    const { phoneNumber } = credentials;
    const user: Representative = await this.representativeService.findByPhone(phoneNumber);
    if (user) {
      return user;
    }
    return null;
  }

  async login(credential: AuthCredentialsDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(credential);
    if (!user) {
      throw new UnauthorizedException('Invalid phone number');
    }
    const access_token = this.jwtService.sign({ phoneNumber: user.phoneNumber, role: UserRole.Representative });
    return { access_token };
  }

  async register(user: Representative): Promise<AuthResponseDto> {
    const existedUser = await this.representativeService.findByPhone(user.phoneNumber);
    const credentials = { phoneNumber: user.phoneNumber };
    if (existedUser) {
      throw new BadRequestException('Phone Number already registered');
    }
    await this.representativeService.create(user);
    return this.login(credentials);
  }
}
