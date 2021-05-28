import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AnswerInput {
  @Field(() => String, { description: 'Text Type', nullable: true })
  text?: string;

  @Field(() => String, { description: 'Option Type', nullable: true })
  option?: string;

  @Field(() => [String], {
    description: 'options of the question',
    nullable: true,
  })
  options?: string[];
}
