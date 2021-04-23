import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Evaluation } from '../entities/evaluation.entity';

@ObjectType()
export class GetEvaluations {
  @Field(() => [Evaluation])
  evaluations: Evaluation[];

  @Field(() => Int)
  totalCount: number;
}
