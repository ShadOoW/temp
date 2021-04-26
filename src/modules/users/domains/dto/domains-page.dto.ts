import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { DomainDto } from './domain.dto';

@ObjectType()
export class DomainsPageDto {
  @Field(() => [DomainDto])
  readonly data: DomainDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: DomainDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
