import { CreatePointInput } from './create-point.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePointInput extends PartialType(CreatePointInput) {
  @Field(() => Int, { description: 'action point value', nullable: true })
  number?: number;

  @Field(() => String, {
    description: 'the action to get the point',
    nullable: true,
  })
  action?: string;

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
