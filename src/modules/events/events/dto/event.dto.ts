import { ObjectType, Field } from '@nestjs/graphql';
import { UserEntity } from '@users/users/entities/user.entity';
import { UserDto } from '@users/users/dto/user.dto';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { EventEntity } from '../entities/event.entity';

@ObjectType()
export class EventDto extends AbstractDto {
  @Field(() => String)
  module: string;

  @Field(() => String)
  command: string;

  @Field(() => String)
  sourceId: string;

  @Field(() => UserDto)
  from?: UserEntity;

  @Field(() => UserDto, { nullable: true })
  to?: UserEntity;

  @Field(() => String)
  payload?: string;

  @Field(() => Boolean)
  read?: boolean;

  constructor(event: EventEntity) {
    super(event);
    this.module = event.module;
    this.command = event.command;
    this.from = event.from;
    this.to = event.to;
    this.payload = event.payload;
    this.read = event.read;
  }
}
