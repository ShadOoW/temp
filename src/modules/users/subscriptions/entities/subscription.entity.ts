import { Entity, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '@shared/base.entity';
import { UserEntity } from '@users/users/entities/user.entity';

@ObjectType('UserSubscription')
@Entity({ name: 'subscriptions' })
export class Subscription extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.subscriptions)
  @Field(() => UserEntity)
  subscriber: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.subscribers)
  @Field(() => UserEntity)
  subscribedTo: UserEntity;
}
