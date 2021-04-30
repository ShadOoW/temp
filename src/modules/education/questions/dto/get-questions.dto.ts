import { ObjectType, Field, Int } from '@nestjs/graphql';
import { QuestionDto } from './question.dto';

@ObjectType()
export class GetQuestions {
  @Field(() => [QuestionDto])
  questions: QuestionDto[];

  @Field(() => Int)
  totalCount: number;
}
