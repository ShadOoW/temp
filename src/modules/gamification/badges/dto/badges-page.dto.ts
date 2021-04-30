import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { BadgeDto } from './badge.dto';

@ObjectType()
export class BadgesPageDto {
  @Field(() => [BadgeDto])
  readonly data: BadgeDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: BadgeDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
