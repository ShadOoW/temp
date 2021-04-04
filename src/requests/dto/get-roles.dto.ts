import { Request } from '../entities/request.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GetRequests {
  @Field(() => [Request])
  requests: Request[];

  @Field(() => Int)
  totalCount: number;
}
