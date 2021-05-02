import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { UtilsService } from '@src/providers/utils.service';
import { Repository } from 'typeorm';
import { CreateEvaluationInput } from './dto/create-evaluation.input';
import { EvaluationsPageOptionsDto } from './dto/evaluations-page-options.dto';
import { EvaluationsPageDto } from './dto/evaluations-page.dto';
import { EvaluationEntity } from './entities/evaluation.entity';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectRepository(EvaluationEntity)
    private readonly repo: Repository<EvaluationEntity>,
  ) {}
  async create(createEvaluationInput: CreateEvaluationInput) {
    const { quiz, user } = createEvaluationInput;
    const exist = this.repo.findOne({ where: { quiz, user } });
    if (exist)
      throw new HttpException(
        ERROR_MESSAGES.CANNOT_CREATE,
        HttpStatus.BAD_REQUEST,
      );
    const createdEvaluation = await this.repo.create(createEvaluationInput);
    return (await this.repo.save(createdEvaluation)).toDto();
  }

  async findAll(pageOptionsDto: EvaluationsPageOptionsDto) {
    const [evaluations, evaluationsCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions(pageOptionsDto),
      relations: ['user', 'quiz'],
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: evaluationsCount,
    });
    return new EvaluationsPageDto(evaluations.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    const evaluation = await this.repo.findOneOrFail(id, {
      relations: ['user', 'quiz'],
    });
    return evaluation.toDto();
  }
}
