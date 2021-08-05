import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PublicAPI } from '../decorators/public-api.decorator';
import { User } from '../user/user.schema';
import { AuthCredentialsDto, AuthResponseDto, ChangePasswordDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicAPI()
  @Post('login')
  async login(@Body() credential: AuthCredentialsDto) {
    return this.authService.login(credential);
  }

  @PublicAPI()
  @Post('password/change')
  async changePassword(@Body() dto: ChangePasswordDto): Promise<AuthResponseDto> {
    return this.authService.changePassword(dto);
  }

  @PublicAPI()
  @Post('register')
  async register(@Body() user: User) {
    return this.authService.register(user);
  }
}
