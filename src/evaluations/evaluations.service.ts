import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEvaluationInput } from './dto/create-evaluation.input';
import { Evaluation } from './entities/evaluation.entity';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectRepository(Evaluation) private readonly repo: Repository<Evaluation>,
  ) {}
  create(createEvaluationInput: CreateEvaluationInput) {
    return this.repo.save(createEvaluationInput);
  }

  async findAll(args = null) {
    const { take, skip } = args;
    delete args.take;
    delete args.skip;
    const [evaluations, totalCount] = await this.repo.findAndCount({
      where: args,
      relations: ['user', 'quiz'],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });
    return { evaluations, totalCount };
  }

  async findOne(id: string) {
    return await this.repo.findOneOrFail(id, { relations: ['user', 'quiz'] });
  }
}
