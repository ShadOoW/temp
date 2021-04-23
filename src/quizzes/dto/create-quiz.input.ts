import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { QuestionQuizInput } from './question-quiz.input';

@InputType()
export class CreateQuizInput {
  @Field(() => Date, { description: 'Date to start the quiz', nullable: true })
  @IsDateString()
  @IsOptional()
  startAt?: Date;

  @Field(() => Date, { description: 'Date to end the quiz', nullable: true })
  @IsDateString()
  @IsOptional()
  endAt?: Date;

  @Field(() => Int, {
    description: 'Duration of the quiz on minutes',
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @Field(() => String, { description: 'Title of the quiz' })
  @IsString()
  title: string;

  @Field(() => String, {
    description: 'Description of the quiz',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => String, {
    description: 'Image of the quiz',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @Field(() => QuestionQuizInput, {
    description: 'Questions IDs',
    nullable: true,
  })
  @IsArray()
  questions: QuestionQuizInput[];

  @Field(() => String, {
    description: 'Quiz created by',
    nullable: true,
  })
  @IsString()
  user: User;
}
