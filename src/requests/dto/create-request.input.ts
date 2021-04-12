import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';
import { CreateRequestUserInput } from './request.inputs';

@InputType()
export class CreateRequestInput {
  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  excerpt?: string;

  @Field(() => String)
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => String)
  from: CreateRequestUserInput;

  @Field(() => String, { nullable: true })
  to?: CreateRequestUserInput;
}
