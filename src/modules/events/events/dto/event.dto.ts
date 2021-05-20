import { ObjectType, Field } from '@nestjs/graphql';
import { UserEntity } from '@users/users/entities/user.entity';
import { UserDto } from '@users/users/dto/user.dto';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { EventEntity } from '../entities/event.entity';
import { EventPayloadDto } from './event-payload.dto';

@ObjectType()
export class EventDto extends AbstractDto {
  @Field(() => String, { nullable: true })
  module: string;

  @Field(() => String, { nullable: true })
  command: string;

  @Field(() => String, { nullable: true })
  sourceId: string;

  @Field(() => UserDto, { nullable: true })
  from?: UserEntity;

  @Field(() => UserDto, { nullable: true })
  to?: UserEntity;

  @Field(() => EventPayloadDto, { nullable: true })
  payload?: string;

  @Field(() => Boolean, { nullable: true })
  read?: boolean;

  constructor(event: EventEntity) {
    super(event);
    this.module = event.module;
    this.command = event.command;
    this.sourceId = event.sourceId;
    this.from = event.from;
    this.to = event.to;
    this.payload = event.payload;
    this.read = event.read;
  }
}
