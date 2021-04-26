import { Entity, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '@shared/base.entity';
import { UserEntity } from '@users/users/entities/user.entity';
import { UserDto } from '@users/users/dto/user.dto';

@ObjectType('UserSubscription')
@Entity({ name: 'subscriptions' })
export class Subscription extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.subscriptions)
  @Field(() => UserDto)
  subscriber: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.subscribers)
  @Field(() => UserDto)
  subscribedTo: UserEntity;
}
