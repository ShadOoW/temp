import { Field, ObjectType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ObjectType()
export class Relationship {
  @Field(() => String)
  @IsUUID()
  id: string;
}
