import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { User } from '../../../users-service/users/entities/user.entity';

@InputType()
export class CreateSessionInput {
  @Field(() => String)
  @IsDateString()
  startDate: Date;

  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  isVideoCall?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isFromMentor?: boolean;

  @Field(() => String)
  mentee: User;

  @Field(() => String)
  mentor: User;
}
