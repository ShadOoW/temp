import { ArgsType, Field } from '@nestjs/graphql';
import { PageOptionsDto } from '@src/common/dto/page-options.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class UsersPageOptionsDto extends PageOptionsDto {
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  readonly active?: boolean = null;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly status?: string = null;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  readonly isAdmin?: boolean = null;
}
