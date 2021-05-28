import { InputType, Field } from '@nestjs/graphql';
import { UserDto } from '@src/modules/users/users/dto/user.dto';
import { IsArray, IsString } from 'class-validator';
import { QuizDto } from '../../quizzes/dto/quiz.dto';
import { AnswerInput } from './answer.input';

@InputType()
export class CreateQuizSolutionInput {
  @Field(() => String, {
    description: 'title of the quizSolution',
    nullable: true,
  })
  @IsString()
  title: string;

  @Field(() => String, {
    description: 'Questions of the quizSolution',
  })
  @IsString()
  quiz: QuizDto;

  @Field(() => [AnswerInput], {
    description: 'Answer of the quizSolution',
  })
  @IsArray()
  answers: AnswerInput[];

  @Field(() => String)
  mentor: UserDto;
}
