import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../../shared/public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const context = GqlExecutionContext.create(ctx);
    const request =
      ctx.getType() === 'http'
        ? ctx.switchToHttp().getRequest()
        : context.getContext().req;

    const bearerToken = (request.headers
      ? request.headers.authorization
      : request.Authorization) as string;

    const tokenWasSent = !!bearerToken;
    if (tokenWasSent) {
      const [bearer, token] = bearerToken.split(' ');
      if (bearer !== 'Bearer' || !token) {
        return false;
      }
      try {
        const { sub: userId } = await this.jwtService.verifyAsync(token);
        if (userId) {
          const user = await this.usersService.getUserPermissions(userId);
          request.user = user;
          return true;
        }
      } catch {
        return false;
      }
    }
    return false;
  }
}
