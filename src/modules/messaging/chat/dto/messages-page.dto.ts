import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { MessageDto } from './message.dto';

@ObjectType()
export class MessagesPageDto {
  @Field(() => [MessageDto])
  readonly data: MessageDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: MessageDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
