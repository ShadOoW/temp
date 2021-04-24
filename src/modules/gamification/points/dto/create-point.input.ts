import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePointInput {
  @Field(() => Int, { description: 'action point value' })
  number: number;

  @Field(() => String, { description: 'the action to get the point' })
  action: string;

  @Field(() => String, {
    description: 'message to show after get the point',
    nullable: true,
  })
  message?: string;

  @Field(() => String, {
    description: 'description of the point',
    nullable: true,
  })
  description?: string;

  @Field(() => String, { description: 'image of the point', nullable: true })
  image?: string;
}
