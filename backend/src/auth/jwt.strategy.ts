import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secretKey'),
    });
  }

  async validate(payload: { userId: string; iat: number; exp: number }): Promise<string> {
    const { iat, userId } = payload;
    const passwordChangedDate = await this.userService.getPasswordChangedDate(userId);
    if (passwordChangedDate.getTime() > (iat + 1) * 1000) {
      throw new UnauthorizedException('Token Expired');
    }
    return userId;
  }
}
