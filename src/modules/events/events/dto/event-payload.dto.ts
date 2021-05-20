import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class EventPayloadDto {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  desciption: string;

  @Field(() => String, { nullable: true })
  status: string;

  @Field(() => Boolean, { nullable: true })
  proposition?: boolean;

  @Field(() => Boolean, { nullable: true })
  isFromMentor?: boolean;

  @Field(() => Boolean, { nullable: true })
  isVideoCall?: boolean;

  @Field(() => String, { nullable: true })
  startDate: Date;

  @Field(() => String, { nullable: true })
  createdAt: Date;
}
