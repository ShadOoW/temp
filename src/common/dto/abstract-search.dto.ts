import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
// import { ToInt } from '../../decorators/transforms.decorator';

export class AbstractSearchDto {
  @IsString()
  @IsNotEmpty()
  q: string;

  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsNumber()
  @IsOptional()
  take = 10;

  get skip() {
    return (this.page - 1) * this.take;
  }
}
