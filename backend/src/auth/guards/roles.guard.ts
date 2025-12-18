import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private role: 'ADMIN' | 'USER') {}
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (!user) return false;
    if (this.role === 'ADMIN') return user.role === 'ADMIN';
    return true;
  }
}
