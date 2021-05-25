import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { FileTagDto } from './file-tag.dto';

@ObjectType()
export class FileTagsPageDto {
  @Field(() => [FileTagDto])
  readonly data: FileTagDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: FileTagDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
