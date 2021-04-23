import { InputType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class PropositionInput {
  @Field(() => String, { description: 'Proposition title' })
  @IsString()
  title: string;

  @Field(() => String, {
    description: 'Proposition description',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  desciption?: string;

  @Field(() => Boolean, { description: 'If proposition is correct or not' })
  @IsBoolean()
  correct: boolean;

  @Field(() => Int, { description: 'Proposition points value' })
  @IsNumber()
  points: number;
}
