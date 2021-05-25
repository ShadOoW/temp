import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateObjectifInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  type?: string;

  @Field(() => String, { nullable: true })
  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  progression?: number;
}
