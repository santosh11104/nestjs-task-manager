
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../permissions/permissions.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!required) return true;

    const { user } = context.switchToHttp().getRequest();
    return required.every(p => user.permissions?.includes(p));
  }
}
