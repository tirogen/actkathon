import { Body, Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthCredentialsDto } from 'src/auth/auth.dto';
// import { UserId } from 'src/decorators/user-id.decorator';
// import { RolesGuard } from 'src/guards/roles.guard';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('Representative')
@Controller('representative')
// @UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly representativeService: UserService) {}

  @Get('me')
  me(@Body() dto: AuthCredentialsDto) {
    return this.representativeService.me(dto.phoneNumber);
  }

  
}
