import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Point } from '../entities/point.entity';

@ObjectType()
export class GetPoints {
  @Field(() => [Point])
  points: Point[];

  @Field(() => Int)
  totalCount: number;
}
