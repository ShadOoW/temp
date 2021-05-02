import { Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { CreateDomainInput } from './dto/create-domain.input';
import { UpdateDomainInput } from './dto/update-domain.input';
import { DomainEntity } from './entities/domain.entity';
import { DomainsPageOptionsDto } from './dto/domains-page-options.dto';
import { DomainsPageDto } from './dto/domains-page.dto';
import { UtilsService } from '@src/providers/utils.service';

@Injectable()
export class DomainsService {
  constructor(
    @InjectRepository(DomainEntity)
    private readonly repo: Repository<DomainEntity>,
  ) {}

  async create(createDomainInput: CreateDomainInput) {
    const { name } = createDomainInput;
    const domain = await this.repo.findOne({ name });
    if (domain) {
      throw new HttpException(ERROR_MESSAGES.EXISTED, HttpStatus.BAD_REQUEST);
    }
    const createdDomain = await this.repo.create(createDomainInput);
    return (await this.repo.save(createdDomain)).toDto();
  }

  async findAll(pageOptionsDto: DomainsPageOptionsDto) {
    const [domains, domainsCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions(pageOptionsDto),
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: domainsCount,
    });
    return new DomainsPageDto(domains.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    const domain = await this.repo.findOne(id);
    return domain ? domain.toDto() : null;
  }

  async update(id: string, updateDomainInput: UpdateDomainInput) {
    const domain = await this.repo.findOne({ id });
    if (!domain) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdDomain = await this.repo.create({ id, ...updateDomainInput });
    return (await this.repo.save(createdDomain)).toDto();
  }

  async remove(id: string) {
    const domainToDelete = await this.repo.findOne(id);
    await this.repo.delete(id);
    return domainToDelete.toDto();
  }
}
