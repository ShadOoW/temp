import { CreateEvaluationInput } from './create-evaluation.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';
import { AnswerInput } from './answer.input';

@InputType()
export class UpdateEvaluationInput extends PartialType(CreateEvaluationInput) {
  @Field(() => String, {
    description: 'title of the evaluation',
    nullable: true,
  })
  @IsString()
  title?: string;

  @Field(() => [AnswerInput], {
    description: 'Answer of the evaluation',
    nullable: true,
  })
  @IsArray()
  answers?: AnswerInput[];
}
