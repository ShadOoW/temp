import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateRequestInput } from './create-request.input';
import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { Status } from '../../shared/interfaces/globalStatus';

@InputType()
export class UpdateRequestInput extends PartialType(CreateRequestInput) {
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

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  status?: Status;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  proposition?: boolean;
}
