import { IsString, IsOptional, IsNumber } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { Status } from '../../shared/interfaces/globalStatus';

@InputType()
export class UpdateSessionInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  status?: Status;

  @Field(() => Int)
  @IsNumber()
  @IsOptional()
  duration?: number;
}
