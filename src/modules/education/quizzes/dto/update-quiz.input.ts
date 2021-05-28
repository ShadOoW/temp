import { CreateQuizInput } from './create-quiz.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';
import { Relationship } from '@src/interfaces/relationship';
import { QuestionInput } from './question.input';

@InputType()
export class UpdateQuizInput extends PartialType(CreateQuizInput) {
  @Field(() => String, {
    description: 'title of the quiz',
    nullable: true,
  })
  @IsString()
  title?: string;

  @Field(() => [QuestionInput], {
    description: 'Questions of the quiz',
    nullable: true,
  })
  @IsArray()
  questions?: QuestionInput[];

  @Field(() => [Relationship], { nullable: true })
  mentees?: Relationship[];
}
