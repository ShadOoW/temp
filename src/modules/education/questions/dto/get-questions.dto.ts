import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Question } from '../entities/question.entity';

@ObjectType()
export class GetQuestions {
  @Field(() => [Question])
  questions: Question[];

  @Field(() => Int)
  totalCount: number;
}
