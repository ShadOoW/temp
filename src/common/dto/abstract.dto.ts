import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractEntity } from '../abstract.entity';

@ObjectType()
export class AbstractDto {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => Date, { nullable: true })
  createdAt: Date;
  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  constructor(entity: AbstractEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
