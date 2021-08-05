import { CanActivate, ExecutionContext, ForbiddenException, Injectable, RequestMethod } from '@nestjs/common';
import { METHOD_METADATA, PATH_METADATA } from '@nestjs/common/constants';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicAPI = this.reflector.getAllAndOverride<boolean>('isPublicAPI', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublicAPI) {
      return true;
    }
    const roles = this.reflector.getAllAndMerge<string[]>('roles', [context.getHandler(), context.getClass()]);
    if (roles.length > 0) {
      const request = context.switchToHttp().getRequest();
      const user = await this.userService.findById(request.user);
      if (!roles.includes(user.role)) {
        const path = this.reflector.get<string>(PATH_METADATA, context.getHandler());
        const cPath = this.reflector.get<string>(PATH_METADATA, context.getClass());
        const methodNum = this.reflector.get<number>(METHOD_METADATA, context.getHandler());
        const method = Object.keys(RequestMethod).find((key) => RequestMethod[key] === methodNum);
        throw new ForbiddenException(`${user.role} role is not allowed on ${method} ${cPath}/${path}`);
      }
    }
    return true;
  }
}
