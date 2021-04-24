import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GetUserDto } from '@users/users/dto/get-user.dto';
import { Status } from '@shared/interfaces/globalStatus';

@ObjectType()
export class GetRequests {
  @Field(() => [GetRequest])
  requests: GetRequest[];

  @Field(() => Int)
  totalCount: number;
}

@ObjectType()
export class GetRequest {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  whyNeedCoaching?: string;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => String, { nullable: true })
  expectations?: string;

  @Field(() => String, { nullable: true })
  status?: Status;

  @Field(() => GetUserDto, { nullable: true })
  mentor?: GetUserDto;

  @Field(() => GetUserDto)
  mentee: GetUserDto;

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;

  @Field(() => Boolean, { nullable: true })
  proposition?: boolean;
}
