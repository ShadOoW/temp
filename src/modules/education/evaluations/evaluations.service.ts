import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { UtilsService } from '@src/providers/utils.service';
import { Repository } from 'typeorm';
import { CreateEvaluationInput } from './dto/create-evaluation.input';
import { EvaluationsPageOptionsDto } from './dto/evaluations-page-options.dto';
import { EvaluationsPageDto } from './dto/evaluations-page.dto';
import { UpdateEvaluationInput } from './dto/update-evaluation.input';
import { EvaluationEntity } from './entities/evaluation.entity';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectRepository(EvaluationEntity)
    private readonly repo: Repository<EvaluationEntity>,
  ) {}
  async create(createEvaluationInput: CreateEvaluationInput, userId) {
    const createdEvaluation = await this.repo.create({
      ...createEvaluationInput,
      mentee: userId,
    });
    return (await this.repo.save(createdEvaluation)).toDto();
  }

  async findAll(pageOptionsDto: EvaluationsPageOptionsDto) {
    const [evaluations, quizzesCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions(pageOptionsDto),
      relations: ['mentee', 'mentor', 'quiz'],
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: quizzesCount,
    });
    return new EvaluationsPageDto(evaluations.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    const evaluation = await this.repo.findOneOrFail(id, {
      relations: ['mentee', 'mentor'],
    });
    return evaluation ? evaluation.toDto() : null;
  }

  async update(id: string, updateEvaluationInput: UpdateEvaluationInput) {
    const evaluation = await this.repo.findOne({ id });
    if (!evaluation) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatedEvaluation = await this.repo.create({
      id,
      ...updateEvaluationInput,
    });
    return (await this.repo.save(updatedEvaluation)).toDto();
  }

  async remove(id: string) {
    const quizToDelete = await this.repo.findOne(id);
    await this.repo.delete(id);
    return quizToDelete.toDto();
  }
}
