import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFileTagInput {
  @Field(() => String)
  name: string;
}
