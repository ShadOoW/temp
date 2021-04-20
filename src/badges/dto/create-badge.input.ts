import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateBadgeInput {
  @Field(() => String, { description: 'the name of the badge' })
  @IsString()
  name: string;

  @Field(() => Int, { description: 'badge points' })
  @IsNumber()
  points: number;

  @Field(() => String, {
    description: 'message to show after get the badge',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  message?: string;

  @Field(() => String, {
    description: 'description of the badge',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => String, { description: 'image of the badge', nullable: true })
  @IsString()
  @IsOptional()
  image?: string;
}
