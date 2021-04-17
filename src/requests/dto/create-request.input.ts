import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';
import { CreateRequestUserInput } from './request.inputs';

@InputType()
export class CreateRequestInput {
  @Field(() => String)
  @IsString()
  whyNeedCoaching: string;

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
  mentor?: CreateRequestUserInput;

  @Field(() => Boolean, { nullable: true })
  proposition?: boolean;
}
