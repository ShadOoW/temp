import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { SessionDto } from './session.dto';

@ObjectType()
export class SessionsPageDto {
  @Field(() => [SessionDto])
  readonly data: SessionDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: SessionDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
