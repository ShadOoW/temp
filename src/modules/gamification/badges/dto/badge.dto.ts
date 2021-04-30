import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { BadgeEntity } from '../entities/badge.entity';

@ObjectType()
export class BadgeDto extends AbstractDto {
  @Field(() => String, { description: 'the name of the badge' })
  name: string;

  @Field(() => String, { description: 'message to show after get the badge' })
  message?: string;

  @Field(() => String, { description: 'description of the badge' })
  description?: string;

  @Field(() => String, { description: 'image of the badge' })
  image?: string;

  constructor(badge: BadgeEntity) {
    super(badge);
    this.name = badge.name;
    this.message = badge.message;
    this.description = badge.description;
    this.image = badge.image;
  }
}
