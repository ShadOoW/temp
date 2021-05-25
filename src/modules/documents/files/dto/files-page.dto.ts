import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { FileDto } from './file.dto';

@ObjectType()
export class FilesPageDto {
  @Field(() => [FileDto])
  readonly data: FileDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: FileDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
