import { Field, ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from '../../../shared/pagination.args';

@ArgsType()
export class GetRequestsArgs extends PaginationArgs {
  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  mentee?: string;

  @Field({ nullable: true })
  mentor?: string;

  @Field(() => Boolean, { nullable: true })
  proposition?: boolean;
}

@ArgsType()
export class GetPropositionsArgs extends PaginationArgs {
  @Field({ nullable: true })
  mentor?: string;
}
