import { Field, ObjectType } from '@nestjs/graphql';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { SubscriptionDto } from './subscription.dto';

@ObjectType()
export class SubscriptionsPageDto {
  @Field(() => [SubscriptionDto])
  readonly data: SubscriptionDto[];

  @Field(() => PageMetaDto)
  readonly meta: PageMetaDto;

  constructor(data: SubscriptionDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
