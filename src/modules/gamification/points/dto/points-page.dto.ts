import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { PointDto } from './point.dto';

@ObjectType()
export class PointsPageDto {
  @Field(() => [PointDto])
  readonly data: PointDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: PointDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
