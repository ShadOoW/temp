import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { PointDto } from '../../points/dto/point.dto';
import { BalanceEntity } from '../entities/balance.entity';

@ObjectType()
export class BalanceDto extends AbstractDto {
  @Field(() => Int)
  score: number;

  @Field(() => [PointDto])
  points: PointDto[];

  constructor(user: BalanceEntity) {
    super(user);
    this.score = user.score;
    this.points = user.points;
  }
}
