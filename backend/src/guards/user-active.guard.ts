import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserActiveGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicAPI = this.reflector.getAllAndOverride<boolean>('isPublicAPI', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublicAPI) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findById(request.user);
    if (!user.isActive) {
      throw new ForbiddenException('Account is disabled by team');
    }
    return true;
  }
}
