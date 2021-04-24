import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Quiz } from '../entities/quiz.entity';

@ObjectType()
export class GetQuizzes {
  @Field(() => [Quiz])
  quizzes: Quiz[];

  @Field(() => Int)
  totalCount: number;
}
