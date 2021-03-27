import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission) private readonly repo: Repository<Permission>,
  ) {}

  async create(createPermissionInput: CreatePermissionInput) {
    return this.repo
      .save(createPermissionInput)
      .then((e) => CreatePermissionInput.fromEntity(e));
  }

  async findAll() {
    return await this.repo
      .find()
      .then((permissions) =>
        permissions.map((e) => CreatePermissionInput.fromEntity(e)),
      );
  }

  async findOne(id: string) {
    return await this.repo
      .findOne(id)
      .then((permission) => CreatePermissionInput.fromEntity(permission));
  }

  async update(id: string, updatePermissionInput: UpdatePermissionInput) {
    return await this.repo.save({ ...updatePermissionInput });
  }

  async remove(id: string) {
    const permissionToDelete = await this.findOne(id);
    await this.repo.delete(permissionToDelete);
    return permissionToDelete;
  }
}