import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthCredentialsDto } from 'src/auth/auth.dto';
import { Representative } from 'src/user/representative/user.schema';
import { PublicAPI } from '../../decorators/public-api.decorator';
import { AuthService } from './auth.service';

@ApiBearerAuth()
@ApiTags('Representative')
@Controller('Representative')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicAPI()
  @Post('/login')
  async login(@Body() credential: AuthCredentialsDto) {
    return this.authService.login(credential);
  }

  // @PublicAPI()
  // @Post('password/change')
  // async changePassword(@Body() dto: ChangePasswordDto): Promise<AuthResponseDto> {
  //   return this.authService.changePassword(dto);
  // }

  @PublicAPI()
  @Post('/register')
  async register(@Body() user: Representative) {
    return this.authService.register(user);
  }
}
