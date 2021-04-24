import { Field, ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from '../../../shared/pagination.args';

@ArgsType()
export class GetEventsArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  from?: string;

  @Field(() => String, { nullable: true })
  module?: string;

  @Field(() => String, { nullable: true })
  command?: string;
}
