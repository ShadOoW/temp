import { Session } from '../entities/session.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GetSessions {
  @Field(() => [Session])
  sessions: Session[];

  @Field(() => Int)
  totalCount: number;
}
