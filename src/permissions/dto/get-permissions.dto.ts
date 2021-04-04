import { Permission } from '../entities/permission.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GetPermissions {
  @Field(() => [Permission])
  data: [Permission];

  @Field(() => Int)
  totalCount: number;
}
