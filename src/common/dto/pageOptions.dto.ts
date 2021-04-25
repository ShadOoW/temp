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

export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  readonly order: Order = Order.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(50)
  @IsOptional()
  readonly take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly q?: string;
}
