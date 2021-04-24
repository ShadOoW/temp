import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDomainInput } from './dto/create-domain.input';
import { UpdateDomainInput } from './dto/update-domain.input';
import { Domain } from './entities/domain.entity';
import { PaginationArgs } from '@shared/pagination.args';

@Injectable()
export class DomainsService {
  constructor(
    @InjectRepository(Domain)
    private readonly repo: Repository<Domain>,
  ) {}

  async create(createDomainInput: CreateDomainInput) {
    const { name } = createDomainInput;
    const domain = await this.repo.findOne({ name });
    if (domain) {
      throw new HttpException(ERROR_MESSAGES.EXISTED, HttpStatus.BAD_REQUEST);
    }
    return this.repo
      .save(createDomainInput)
      .then((e) => CreateDomainInput.fromEntity(e));
  }

  async findAll(pagination: PaginationArgs = null) {
    const { take, skip } = pagination || {};
    const [domains, totalCount] = await this.repo.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      take,
      skip,
    });
    return { domains, totalCount };
  }

  async findOne(id: string) {
    return await this.repo
      .findOne(id)
      .then((domain) => CreateDomainInput.fromEntity(domain));
  }

  async update(id: string, updateDomainInput: UpdateDomainInput) {
    const domain = await this.repo.findOne({ id });
    if (!domain) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.repo.save({ id, ...updateDomainInput });
  }

  async remove(id: string) {
    const domainToDelete = await this.findOne(id);
    await this.repo.delete(id);
    return domainToDelete;
  }
}
