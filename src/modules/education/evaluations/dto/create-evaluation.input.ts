import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { QuizEntity } from '../../quizzes/entities/quiz.entity';
import { UserEntity } from '@users/users/entities/user.entity';

@InputType()
export class CreateEvaluationInput {
  @Field(() => Int, { description: 'The score of the evaluation' })
  @IsNumber()
  score: number;

  @Field(() => Date, { description: 'Started DateTime', nullable: true })
  @IsDateString()
  @IsOptional()
  startAt?: Date;

  @Field(() => Int, {
    description: 'Time Spent on the quiz',
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  timeSpent?: number;

  @Field(() => String, {
    description: 'User note',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  note?: string;

  @Field(() => String, { description: 'Quiz ID' })
  @IsString()
  quiz: QuizEntity;

  @Field(() => String, { description: 'User ID' })
  @IsString()
  user: UserEntity;
}
