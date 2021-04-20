import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateSubscriptionInput } from './dto/create-subscription.input';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly repo: Repository<Subscription>,
  ) {}

  create(createSubscriptionInput: CreateSubscriptionInput) {
    return this.repo.save(createSubscriptionInput);
  }

  async findSubscribers(args = null) {
    const { take, skip } = args;
    delete args.id;
    delete args.take;
    delete args.skip;
    const [subscribers, totalCount] = await this.repo.findAndCount({
      where: args,
      relations: ['subscriber'],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });
    return { subscribers, totalCount };
  }

  async findSubscriptions(args = null) {
    const { take, skip } = args;
    delete args.id;
    delete args.take;
    delete args.skip;
    const [subscriptions, totalCount] = await this.repo.findAndCount({
      where: args,
      relations: ['subscribedTo', 'subscribedTo.profile'],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });
    return { subscriptions, totalCount };
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
