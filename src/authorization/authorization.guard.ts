import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { log } from 'console';

@Injectable()
export class AuthorizationGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
   if (err || !user) {
      throw err || new UnauthorizedException();
   }
   return user;
}
}
