import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateRequestInput } from './create-request.input';
import { IsString, IsOptional } from 'class-validator';
import { RequestStatus } from '../interfaces/requestStatus';

@InputType()
export class UpdateRequestInput extends PartialType(CreateRequestInput) {
  @Field(() => String, { nullable: true })
  @IsOptional()
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

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  status?: RequestStatus;
}
