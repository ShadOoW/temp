import { ArgsType, Field } from '@nestjs/graphql';
import { PageOptionsDto } from '@src/common/dto/page-options.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class EventsPageOptionsDto extends PageOptionsDto {
  @IsUUID()
  @IsOptional()
  @Field(() => String, { nullable: true })
  from?: string;

  @IsUUID()
  @IsOptional()
  @Field(() => String, { nullable: true })
  to?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  module?: string[];
}
