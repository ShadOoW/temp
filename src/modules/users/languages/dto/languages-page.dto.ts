import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { LanguageDto } from './language.dto';

@ObjectType()
export class LanguagesPageDto {
  @Field(() => [LanguageDto])
  readonly data: LanguageDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: LanguageDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
