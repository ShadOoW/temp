import { InputType, Field } from '@nestjs/graphql';
import { UserDto } from '@src/modules/users/users/dto/user.dto';

@InputType()
export class EventUserInput {
  @Field(() => String)
  id?: string;
}

@InputType()
export class CreateEventInput {
  @Field(() => String)
  module: string;

  @Field(() => String)
  command: string;

  @Field(() => String)
  sourceId: string;

  @Field(() => EventUserInput, { nullable: true })
  from?: EventUserInput;

  @Field(() => EventUserInput, { nullable: true })
  to?: EventUserInput;

  @Field(() => String)
  payload?: any;

  constructor(
    module: string,
    command: string,
    sourceId: string,
    from: UserDto = null,
    to: UserDto = null,
    payload: any = null,
  ) {
    this.module = module;
    this.command = command;
    this.sourceId = sourceId;
    this.from = from;
    this.to = to;
    this.payload = payload;
  }
}
