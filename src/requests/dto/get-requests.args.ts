import { Field, ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from '../../shared/pagination.args';

@ArgsType()
export class GetRequestsArgs extends PaginationArgs {
  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  from?: string;

  @Field({ nullable: true })
  to?: string;
}
