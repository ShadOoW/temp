import { Field, ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from '../../shared/pagination.args';

@ArgsType()
export class GetSessionsArgs extends PaginationArgs {
  @Field({ nullable: true })
  mentee?: string;

  @Field({ nullable: true })
  mentor?: string;
}
