import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Status } from '@shared/interfaces/globalStatus';
import { UserDto } from '../../users/dto/user.dto';

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

  @Field(() => UserDto, { nullable: true })
  mentor?: UserDto;

  @Field(() => UserDto)
  mentee: UserDto;

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;

  @Field(() => Boolean, { nullable: true })
  proposition?: boolean;
}
