import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePointInput } from './dto/create-point.input';
import { UpdatePointInput } from './dto/update-point.input';
import { Point } from './entities/point.entity';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point) private readonly repo: Repository<Point>,
  ) {}

  create(createPointInput: CreatePointInput) {
    return this.repo.save(createPointInput);
  }

  async findAll(args = null) {
    const { take, skip } = args;
    delete args.take;
    delete args.skip;
    const [points, totalCount] = await this.repo.findAndCount({
      where: args,
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });
    return { points, totalCount };
  }

  async findOne(id: string) {
    return await this.repo.findOneOrFail(id);
  }

  update(id: string, updatePointInput: UpdatePointInput) {
    return this.repo.save({ id, ...updatePointInput });
  }

  async remove(id: string) {
    const pointToDelete = await this.findOne(id);
    await this.repo.delete(id);
    return pointToDelete;
  }
}
