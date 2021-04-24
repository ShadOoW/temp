import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { Repository } from 'typeorm';
import { CreateQuizInput } from './dto/create-quiz.input';
import { UpdateQuizInput } from './dto/update-quiz.input';
import { Quiz } from './entities/quiz.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz) private readonly repo: Repository<Quiz>,
  ) {}
  create(createQuizInput: CreateQuizInput) {
    return this.repo.save(createQuizInput);
  }

  async findAll(args = null) {
    const { take, skip } = args;
    delete args.take;
    delete args.skip;
    const [quizzes, totalCount] = await this.repo.findAndCount({
      where: args,
      relations: ['user', 'questions'],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });
    return { quizzes, totalCount };
  }

  async findOne(id: string) {
    return await this.repo.findOneOrFail(id, {
      relations: ['user', 'questions'],
    });
  }

  async update(id: string, updateQuizInput: UpdateQuizInput) {
    const quiz = await this.repo.findOne({ id });
    if (!quiz) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.repo.save({ id, ...updateQuizInput });
  }

  async remove(id: string) {
    const quizToDelete = await this.findOne(id);
    await this.repo.delete(id);
    return quizToDelete;
  }
}
