import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GetUserDto } from '@users/users/dto/get-user.dto';

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

  @Field(() => GetUserDto)
  from?: GetUserDto;

  @Field(() => GetUserDto, { nullable: true })
  to?: GetUserDto;

  @Field(() => String)
  payload?: string;
}
