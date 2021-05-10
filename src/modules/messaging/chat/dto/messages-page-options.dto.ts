import { ArgsType, Field } from '@nestjs/graphql';
import { PageOptionsDto } from '@src/common/dto/page-options.dto';
import { IsString, IsUUID } from 'class-validator';

@ArgsType()
export class MessagesPageOptionsDto extends PageOptionsDto {
  @Field(() => String)
  @IsString()
  @IsUUID()
  room: string;
}
