import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  Min,
  IsOptional,
  Max,
  IsString,
  IsNotEmpty,
} from 'class-validator';

import { Order } from '../constants/order';

@ArgsType()
export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  @Field(() => String)
  readonly order: Order = Order.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  @Field(() => Int)
  readonly page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(2)
  @Max(50)
  @IsOptional()
  @Field(() => Int)
  readonly take: number = 2;

  // get skip(): number {
  // return (this.page - 1) * this.take;
  // }

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly q?: string;
}
