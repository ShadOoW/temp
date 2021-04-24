import { CreateQuizInput } from './create-quiz.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { QuestionQuizInput } from './question-quiz.input';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateQuizInput extends PartialType(CreateQuizInput) {
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
  @IsNumber()
  @IsOptional()
  duration?: number;

  @Field(() => String, { description: 'Title of the quiz', nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

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

  @Field(() => [QuestionQuizInput], {
    description: 'Questions IDs',
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  questions?: QuestionQuizInput[];
}
