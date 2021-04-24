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

@InputType()
export class CreatePublicRequestInput {
  @Field(() => String)
  @IsString()
  whyNeedCoaching: string;

  @Field(() => String)
  @IsString()
  expectations: string;

  @Field(() => String)
  mentee: CreateRequestUserInput;
}

@InputType()
export class CreatePrivateRequestInput {
  @Field(() => String)
  @IsString()
  message: string;

  @Field(() => String)
  mentee: CreateRequestUserInput;

  @Field(() => String)
  mentor: CreateRequestUserInput;
}
