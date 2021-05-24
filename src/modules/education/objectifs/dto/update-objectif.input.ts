import { IsString, IsOptional, IsNumber } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateObjectifInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  progression?: number;
}
