import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Badge } from '../entities/badge.entity';

@ObjectType()
export class GetBadges {
  @Field(() => [Badge])
  badges: Badge[];

  @Field(() => Int)
  totalCount: number;
}
