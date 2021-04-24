import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  PolicyHandler,
  CHECK_POLICIES_KEY,
} from '../decorators/check-policies.decorator';
import { CaslAbilityFactory, AppAbility } from '@users/casl-ability.factory';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        ctx.getHandler(),
      ) || [];
    const args = context.getType() === 'http' ? { id: null } : ctx.getArgs();
    const { user } =
      context.getType() === 'http'
        ? context.switchToHttp().getRequest()
        : ctx.getContext().req;
    const ability = this.caslAbilityFactory.createForUser(user, args);
    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
