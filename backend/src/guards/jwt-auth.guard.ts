import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublicAPI = this.reflector.getAllAndOverride<boolean>('isPublicAPI', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublicAPI) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, userId) {
    if (err || !userId) {
      throw err || new UnauthorizedException('Invalid Token');
    }
    return userId;
  }
}
