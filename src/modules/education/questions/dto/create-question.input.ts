import { InputType, Int, Field } from '@nestjs/graphql';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '@users/users/entities/user.entity';
import { PropositionInput } from './proposition.input';

@InputType()
export class CreateQuestionInput {
  @Field(() => Int, { description: 'Order of the question' })
  @IsNumber()
  order: number;

  @Field(() => Int, {
    description: 'Duration of the question on seconds',
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @Field(() => String, { description: 'Title of the question' })
  @IsString()
  title: string;

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
  })
  @IsArray()
  propositions: PropositionInput[];

  @Field(() => String, {
    description: 'Question created by',
    nullable: true,
  })
  @IsString()
  user: User;
}
