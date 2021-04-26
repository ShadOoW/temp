import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserDto } from '@src/modules/users/users/dto/user.dto';

@ObjectType()
export class GetEvents {
  @Field(() => [GetEventDto])
  events: GetEventDto[];

  @Field(() => Int)
  totalCount: number;
}
@ObjectType()
export class GetEventDto {
  @Field(() => String)
  module: string;

  @Field(() => String)
  command: string;

  @Field(() => String)
  sourceId: string;

  @Field(() => UserDto)
  from?: UserDto;

  @Field(() => UserDto, { nullable: true })
  to?: UserDto;

  @Field(() => String)
  payload?: string;
}
