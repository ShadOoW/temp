import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { CreateRequestUserInput } from './request.inputs';

@InputType()
export class CreateRequestInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  whyNeedCoaching?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  expectations?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  message?: string;

  @Field(() => String)
  mentee: CreateRequestUserInput;

  @Field(() => String, { nullable: true })
  @IsOptional()
  mentor?: CreateRequestUserInput;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  proposition?: boolean;
}
