import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class GetRequestsArgs {
  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  from?: string;

  @Field({ nullable: true })
  to?: string;
}
