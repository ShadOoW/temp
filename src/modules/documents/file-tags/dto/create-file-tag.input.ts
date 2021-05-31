import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFileTagInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  color: string;
}
