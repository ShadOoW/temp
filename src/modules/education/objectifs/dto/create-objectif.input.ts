import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { UserEntity } from '@users/users/entities/user.entity';

@InputType()
export class CreateObjectifInput {
  @Field(() => String)
  @IsDateString()
  dueDate: Date;

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
  progression?: number;

  @Field(() => String)
  mentee: UserEntity;

  @Field(() => String)
  mentor: UserEntity;
}
