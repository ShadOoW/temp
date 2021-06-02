import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateObjectifInput } from './dto/update-objectif.input';
import { ObjectifEntity } from './entities/objectif.entity';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { CreateObjectifInput } from './dto/create-objectif.input';
import { UtilsService } from '@src/providers/utils.service';
import { ObjectifDto } from './dto/objectif.dto';
import { ObjectifsPageOptionsDto } from './dto/objectifs-page-options.dto';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { ObjectifsPageDto } from './dto/objectifs-page.dto';

@Injectable()
export class ObjectifsService {
  constructor(
    @InjectRepository(ObjectifEntity)
    private readonly repo: Repository<ObjectifEntity>,
  ) {}

  async create(createObjectifInput: CreateObjectifInput): Promise<ObjectifDto> {
    const createdObjectif = await this.repo.create(createObjectifInput);
    const savedObjectif = await this.repo.save(createdObjectif);
    return this.findOne(savedObjectif.id);
  }

  // TODO WHERE & PAGE OPTIONS
  async findAll(
    pageOptionsDto: ObjectifsPageOptionsDto,
    mentor?: string,
    mentee?: string,
  ) {
    const [objectifs, objectifsCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions({
        ...pageOptionsDto,
        mentee,
        mentor,
      }),
      relations: ['mentee', 'mentor', 'mentee.profile', 'mentor.profile'],
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: objectifsCount,
    });
    return new ObjectifsPageDto(objectifs.toDtos(), pageMetaDto);
  }

  async objectifsAvg(mentor: string, mentee: string) {
    const { avg } = await this.repo
      .createQueryBuilder('objectifs')
      .innerJoinAndSelect('objectifs.mentor', 'mentor')
      .innerJoinAndSelect('objectifs.mentee', 'mentee')
      .andWhere('mentor.id = :id', { id: mentor })
      .orWhere('mentee.id = :id', { id: mentee })
      .select('AVG(objectifs.progression)', 'avg')
      .getRawOne();
    return parseFloat(avg).toFixed(2);
  }
  async findOne(id: string) {
    const objectif = await this.repo.findOneOrFail(id, {
      relations: ['mentee', 'mentor', 'mentee.profile', 'mentor.profile'],
    });
    return objectif ? objectif.toDto() : null;
  }

  async update(id: string, updateObjectifInput: UpdateObjectifInput) {
    const objectif = await this.repo.findOne({ id });
    if (!objectif) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdObjectif = await this.repo.create({
      id,
      ...updateObjectifInput,
    });
    await this.repo.save(createdObjectif);
    return this.findOne(id);
  }

  async remove(id: string) {
    const objectifToDelete = await this.findOne(id);
    if (objectifToDelete) {
      await this.repo.delete(id);
      return objectifToDelete;
    }
  }
}
