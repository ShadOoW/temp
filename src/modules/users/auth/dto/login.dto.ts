import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  username?: string;

  @Field(() => String)
  password?: string;
}
