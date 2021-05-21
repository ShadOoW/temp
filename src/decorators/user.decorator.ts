import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator((data, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  // const req = ctx.switchToHttp().getRequest();
  const req =
    context.getType() === 'http'
      ? context.switchToHttp().getRequest()
      : ctx.getContext().req;
  return req.user.id;
});
