import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { UtilsService } from '@src/providers/utils.service';
import { Repository } from 'typeorm';
import { BadgesPageOptionsDto } from './dto/badges-page-options.dto';
import { BadgesPageDto } from './dto/badges-page.dto';
import { CreateBadgeInput } from './dto/create-badge.input';
import { UpdateBadgeInput } from './dto/update-badge.input';
import { BadgeEntity } from './entities/badge.entity';

@Injectable()
export class BadgesService {
  constructor(
    @InjectRepository(BadgeEntity)
    private readonly repo: Repository<BadgeEntity>,
  ) {}
  async create(createBadgeInput: CreateBadgeInput) {
    const createdBadge = await this.repo.create(createBadgeInput);
    return (await this.repo.save(createdBadge)).toDto();
  }

  async findAll(pageOptionsDto: BadgesPageOptionsDto) {
    const [badges, badgesCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions(pageOptionsDto),
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: badgesCount,
    });
    return new BadgesPageDto(badges.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    const badge = await this.repo.findOneOrFail(id);
    return badge ? badge.toDto() : null;
  }

  async update(id: string, updateBadgeInput: UpdateBadgeInput) {
    const updatedBadge = await this.repo.create({ id, ...updateBadgeInput });
    return (await this.repo.save(updatedBadge)).toDto();
  }

  async remove(id: string) {
    const pointToDelete = await this.repo.findOne(id);
    await this.repo.delete(id);
    return pointToDelete.toDto();
  }
}
