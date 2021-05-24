import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { UserEntity } from '@users/users/entities/user.entity';
import { Status } from '@src/shared/interfaces/globalStatus';

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

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  status?: Status;

  @Field(() => String)
  mentee: UserEntity;

  @Field(() => String)
  mentor: UserEntity;
}
