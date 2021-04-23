import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@InputType()
export class CreateSessionInput {
  @Field(() => String)
  @IsDateString()
  startDate: Date;

  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => Int)
  @IsNumber()
  @IsOptional()
  description?: string;

  @Field(() => Int)
  @IsNumber()
  @IsOptional()
  duration?: number;

  @Field(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isVideoCall?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean)
  isFromMentor?: boolean;

  @Field(() => String)
  mentee: User;

  @Field(() => String)
  mentor: User;
}
