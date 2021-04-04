import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '../shared/ERROR_MESSAGES';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { Permission } from './entities/permission.entity';
import { PaginationArgs } from 'src/shared/pagination.args';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission) private readonly repo: Repository<Permission>,
  ) {}

  async create(createPermissionInput: CreatePermissionInput) {
    const { name } = createPermissionInput;
    const permission = await this.repo.findOne({ name });
    if (permission) {
      throw new HttpException(ERROR_MESSAGES.EXISTED, HttpStatus.BAD_REQUEST);
    }
    return this.repo
      .save(createPermissionInput)
      .then((e) => CreatePermissionInput.fromEntity(e));
  }

  async findAll(pagination: PaginationArgs) {
    const { take, skip } = pagination;
    const [permissions, totalCount] = await this.repo.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      take,
      skip,
    });
    return { permissions, totalCount };
  }

  async findOne(id: string) {
    return await this.repo
      .findOne(id)
      .then((permission) => CreatePermissionInput.fromEntity(permission));
  }

  async update(id: string, updatePermissionInput: UpdatePermissionInput) {
    const permission = await this.repo.findOne({ id });
    if (!permission) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.repo.save({ ...updatePermissionInput });
  }

  async remove(id: string) {
    const permissionToDelete = await this.findOne(id);
    await this.repo.delete(permissionToDelete);
    return permissionToDelete;
  }
}
