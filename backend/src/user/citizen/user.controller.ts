import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthCredentialsDto } from 'src/auth/auth.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('Citizen')
@Controller('citizen')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly citizenService: UserService) {}

  @Get('me')
  me(@Body() dto: AuthCredentialsDto) {
    return this.citizenService.me(dto.phoneNumber);
  }
}
