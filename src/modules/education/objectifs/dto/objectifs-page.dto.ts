import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { ObjectifDto } from './objectif.dto';

@ObjectType()
export class ObjectifsPageDto {
  @Field(() => [ObjectifDto])
  readonly data: ObjectifDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: ObjectifDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
