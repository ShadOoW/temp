import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { PointEntity } from '../entities/point.entity';

@ObjectType()
export class PointDto extends AbstractDto {
  @Field(() => Int, { description: 'action point value' })
  number: number;

  @Field(() => String, { description: 'the action to get the point' })
  action: string;

  @Field(() => String, { description: 'message to show after get the point' })
  message?: string;

  @Field(() => String, { description: 'description of the point' })
  description?: string;

  @Field(() => String, { description: 'image of the point' })
  image?: string;

  constructor(point: PointEntity) {
    super(point);
    this.number = point.number;
    this.action = point.action;
    this.message = point.message;
    this.description = point.description;
    this.image = point.image;
  }
}
