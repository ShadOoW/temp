import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { EventDto } from './event.dto';

@ObjectType()
export class EventsPageDto {
  @Field(() => [EventDto])
  readonly data: EventDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: EventDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
