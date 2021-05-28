import { InputType, Field } from '@nestjs/graphql';
import { Relationship } from '@src/interfaces/relationship';
import { IsArray, IsString } from 'class-validator';
import { QuestionInput } from './question.input';

@InputType()
export class CreateQuizInput {
  @Field(() => String, {
    description: 'title of the quiz',
    nullable: true,
  })
  @IsString()
  title: string;

  @Field(() => [QuestionInput], {
    description: 'Questions of the quiz',
    nullable: true,
  })
  @IsArray()
  questions: QuestionInput[];

  @Field(() => [Relationship])
  mentees: Relationship[];
}
