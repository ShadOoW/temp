import { ObjectType, Field } from '@nestjs/graphql';
import { UserEntity } from '@users/users/entities/user.entity';
import { UserDto } from '@users/users/dto/user.dto';
import { AbstractDto } from '@src/shared/abstract.dto';

@ObjectType('UserSubscription')
export class SubscriptionDto extends AbstractDto {
  @Field(() => UserDto)
  subscriber: UserEntity;

  @Field(() => UserDto)
  subscribedTo: UserEntity;
}
