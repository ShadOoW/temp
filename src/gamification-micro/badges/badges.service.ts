import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBadgeInput } from './dto/create-badge.input';
import { UpdateBadgeInput } from './dto/update-badge.input';
import { Badge } from './entities/badge.entity';

@Injectable()
export class BadgesService {
  constructor(
    @InjectRepository(Badge) private readonly repo: Repository<Badge>,
  ) {}
  create(createBadgeInput: CreateBadgeInput) {
    return this.repo.save(createBadgeInput);
  }

  async findAll(args = null) {
    const { take, skip } = args;
    delete args.take;
    delete args.skip;
    const [badges, totalCount] = await this.repo.findAndCount({
      where: args,
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });
    return { badges, totalCount };
  }

  async findOne(id: string) {
    return await this.repo.findOneOrFail(id);
  }

  update(id: string, updateBadgeInput: UpdateBadgeInput) {
    return this.repo.save({ id, ...updateBadgeInput });
  }

  async remove(id: string) {
    const pointToDelete = await this.findOne(id);
    await this.repo.delete(id);
    return pointToDelete;
  }
}
