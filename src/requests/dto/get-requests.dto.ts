import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GetUserDto } from '../../users/dto/get-user.dto';
import { RequestStatus } from '../interfaces/requestStatus';

@ObjectType()
export class GetRequests {
  @Field(() => [GetRequest])
  requests: GetRequest[];

  @Field(() => Int)
  totalCount: number;
}

@ObjectType()
export class GetRequest {
  @Field(() => String)
  id: string;

  @Field(() => String)
  whyNeedCoaching: string;

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => String, { nullable: true })
  expectations?: string;

  @Field(() => String, { nullable: true })
  status?: RequestStatus;

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
