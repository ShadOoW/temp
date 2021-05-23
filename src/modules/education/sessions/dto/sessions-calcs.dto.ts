import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SessionsCalcsDto {
  @Field(() => Int)
  readonly count: number;

  @Field(() => Int)
  readonly durationTotal: number;

  constructor(count: number, durationTotal: number) {
    this.count = count;
    this.durationTotal = durationTotal;
  }
}
