import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { UtilsService } from '@src/providers/utils.service';
import { Repository } from 'typeorm';
import { CreatePointInput } from './dto/create-point.input';
import { PointsPageOptionsDto } from './dto/points-page-options.dto';
import { PointsPageDto } from './dto/points-page.dto';
import { UpdatePointInput } from './dto/update-point.input';
import { PointEntity } from './entities/point.entity';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(PointEntity)
    private readonly repo: Repository<PointEntity>,
  ) {}

  async create(createPointInput: CreatePointInput) {
    const createdPoint = await this.repo.create(createPointInput);
    return (await this.repo.save(createdPoint)).toDto();
  }

  // TODO SKIP & WHERE
  async findAll(pageOptionsDto: PointsPageOptionsDto) {
    const { order, take, page } = pageOptionsDto;
    const [points, pointsCount] = await this.repo.findAndCount({
      order: {
        createdAt: order,
      },
      take,
      skip: UtilsService.skip(page, take),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: pointsCount,
    });
    return new PointsPageDto(points.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    const point = await this.repo.findOneOrFail(id);
    return point ? point.toDto() : null;
  }

  async update(id: string, updatePointInput: UpdatePointInput) {
    const updatedPoint = await this.repo.create({ id, ...updatePointInput });
    return (await this.repo.save(updatedPoint)).toDto();
  }

  async remove(id: string) {
    const pointToDelete = await this.repo.findOneOrFail(id);
    await this.repo.delete(id);
    return pointToDelete.toDto();
  }
}
