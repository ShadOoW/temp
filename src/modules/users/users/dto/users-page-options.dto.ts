import { ArgsType, Field } from '@nestjs/graphql';
import { PageOptionsDto } from '@src/common/dto/page-options.dto';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

@ArgsType()
export class UsersPageOptionsDto extends PageOptionsDto {
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  readonly active?: boolean = null;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  readonly isAdmin?: boolean;
}
