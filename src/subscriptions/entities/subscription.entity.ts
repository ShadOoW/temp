import { Entity, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../../shared/base.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity({ name: 'subscriptions' })
export class Subscription extends BaseEntity {
  @ManyToOne(() => User, (user) => user.subscriptions)
  @Field(() => User)
  subscriber: User;

  @ManyToOne(() => User, (user) => user.subscribers)
  @Field(() => User)
  subscribedTo: User;
}
