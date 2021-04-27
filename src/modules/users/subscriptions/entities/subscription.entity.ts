import { Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '@users/users/entities/user.entity';
import { AbstractEntity } from '@src/common/abstract.entity';
import { SubscriptionDto } from '../dto/subscription.dto';

@Entity({ name: 'subscriptions' })
export class SubscriptionEntity extends AbstractEntity<SubscriptionDto> {
  @ManyToOne(() => UserEntity, (user) => user.subscriptions)
  subscriber: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.subscribers)
  subscribedTo: UserEntity;

  dtoClass = SubscriptionDto;
}
