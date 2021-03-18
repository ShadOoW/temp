import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator((data, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
