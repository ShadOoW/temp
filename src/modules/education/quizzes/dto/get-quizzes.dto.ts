import { ObjectType, Field, Int } from '@nestjs/graphql';
import { QuizDto } from './quiz.dto';

@ObjectType()
export class GetQuizzes {
  @Field(() => [QuizDto])
  quizzes: QuizDto[];

  @Field(() => Int)
  totalCount: number;
}
