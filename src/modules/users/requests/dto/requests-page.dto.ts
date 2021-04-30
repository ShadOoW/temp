import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { RequestDto } from './request.dto';

@ObjectType()
export class RequestsPageDto {
  @Field(() => [RequestDto])
  readonly data: RequestDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: RequestDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
