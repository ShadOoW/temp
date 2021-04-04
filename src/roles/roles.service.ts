import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '../shared/ERROR_MESSAGES';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { PaginationArgs } from '../shared/pagination.args';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly repo: Repository<Role>,
  ) {}

  async create(createRoleInput: CreateRoleInput) {
    const { name } = createRoleInput;
    const role = await this.repo.findOne({ name });
    if (role) {
      throw new HttpException(ERROR_MESSAGES.EXISTED, HttpStatus.BAD_REQUEST);
    }
    return await this.repo
      .save(createRoleInput)
      .then((e) => CreateRoleInput.fromEntity(e));
  }

  async findAll(pagination: PaginationArgs) {
    const { skip, take } = pagination;
    const [roles, totalCount] = await this.repo.findAndCount({
      relations: ['permissions'],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });
    return { roles, totalCount };
  }

  async findOne(id: string) {
    return await this.repo
      .findOne(id)
      .then((role) => CreateRoleInput.fromEntity(role));
  }

  async update(id: string, updateRoleInput: UpdateRoleInput) {
    const role = await this.repo.findOne({ id });
    if (!role) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.repo.save({ ...updateRoleInput });
  }

  async remove(id: string) {
    const roleToDelete = await this.findOne(id);
    await this.repo.delete(roleToDelete);
    return roleToDelete;
  }
}
