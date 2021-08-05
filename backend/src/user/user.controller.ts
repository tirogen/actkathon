import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/constant/user.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { InviteMemberDto, UpdateProfileDto, UpdateRoleDto } from './user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  me(@UserId() userId: string) {
    return this.userService.me(userId);
  }

  @Get('members')
  @Roles(UserRole.Owner, UserRole.Admin, UserRole.Manager)
  findTeamMembers(@UserId() userId: string) {
    return this.userService.findTeamMembers(userId);
  }

  @Patch('')
  updateProfile(@UserId() userId: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.userService.updateProfile(userId, updateProfileDto);
  }

  @Delete('disable/me')
  disableMe(@UserId() userId: string) {
    return this.userService.disableMe(userId);
  }

  @Delete('disable/:userId')
  @Roles(UserRole.Owner, UserRole.Admin, UserRole.Manager)
  disableMember(@UserId() userId: string, @Param('userId') targetUserId: string) {
    return this.userService.disableMember(userId, targetUserId);
  }

  @Patch('update-role')
  @Roles(UserRole.Owner, UserRole.Admin, UserRole.Manager)
  updateRole(@UserId() userId: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.userService.updateRole(userId, updateRoleDto.userId, updateRoleDto.role);
  }

  @Post('invite')
  @Roles(UserRole.Owner, UserRole.Admin, UserRole.Manager)
  invite(@UserId() userId: string, @Body() inviteMemberDto: InviteMemberDto) {
    return this.userService.inviteMember(userId, inviteMemberDto);
  }
}
