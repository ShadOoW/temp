import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AnswerDto {
  @Field(() => String, { description: 'text of the answer', nullable: true })
  text: string;

  @Field(() => String, { description: 'option of the answer', nullable: true })
  option: string;

  @Field(() => [String], {
    description: 'options of the answer',
    nullable: true,
  })
  options?: string[];
}
