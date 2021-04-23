import { CreateQuestionInput } from './create-question.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { PropositionInput } from './proposition.input';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateQuestionInput extends PartialType(CreateQuestionInput) {
  @Field(() => Int, { description: 'Order of the question', nullable: true })
  @IsNumber()
  @IsOptional()
  order?: number;

  @Field(() => Int, {
    description: 'Duration of the question on seconds',
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @Field(() => String, { description: 'Title of the question', nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field(() => String, {
    description: 'Description of the question',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => String, {
    description: 'Image of the question',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @Field(() => [PropositionInput], {
    description: 'Propositions of the question',
    nullable: true,
  })
  @IsArray()
  @IsOptional()
  propositions?: PropositionInput[];
}
