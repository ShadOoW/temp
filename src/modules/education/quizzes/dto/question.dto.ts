import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class QuestionDto {
  @Field(() => String, { description: 'Title of the question' })
  question: string;

  @Field(() => String, {
    description: 'Description of the question',
  })
  type: string;

  @Field(() => [String], {
    description: 'Description of the question',
    nullable: true,
  })
  options?: string[];
}
