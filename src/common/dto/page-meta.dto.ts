import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageOptionsDto } from './page-options.dto';

interface IPageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

@ObjectType()
export class PageMetaDto {
  @Field(() => Int)
  readonly page: number;

  @Field(() => Int)
  readonly take: number;

  @Field(() => Int)
  readonly itemCount: number;

  @Field(() => Int)
  readonly pageCount: number;

  constructor({ pageOptionsDto, itemCount }: IPageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(itemCount / this.take);
  }
}
