import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { Repository } from 'typeorm';
import { CreateDomainInput } from './dto/create-domain.input';
import { UpdateDomainInput } from './dto/update-domain.input';
import { DomainEntity } from './entities/domain.entity';

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

  async findAll() {
    const [domains, domainsCount] = await this.repo.findAndCount();
    return domains.toDtos();
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
