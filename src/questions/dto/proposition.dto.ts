import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class PropositionDto {
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

  @Field(() => Boolean, { description: 'Proposition points value' })
  @IsNumber()
  points: number;
}
