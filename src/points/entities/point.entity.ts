import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Point {
  @Field(() => Int, { description: 'action point value' })
  number: number;

  @Field(() => String, { description: 'the action of point value' })
  action: string;
}
