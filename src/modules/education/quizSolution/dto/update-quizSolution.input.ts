import { CreateQuizSolutionInput } from './create-quizSolution.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { AnswerInput } from './answer.input';

@InputType()
export class UpdateQuizSolutionInput extends PartialType(
  CreateQuizSolutionInput,
) {
  @Field(() => String, {
    description: 'title of the quizSolution',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @Field(() => [AnswerInput], {
    description: 'Answer of the quizSolution',
    nullable: true,
  })
  @IsArray()
  @IsOptional()
  answers?: AnswerInput[];
}
