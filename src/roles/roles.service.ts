import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly repo: Repository<Role>,
  ) {}

  async create(createRoleInput: CreateRoleInput) {
    return await this.repo
      .save(createRoleInput)
      .then((e) => CreateRoleInput.fromEntity(e));
  }

  async findAll() {
    return await this.repo
      .find({ relations: ['permissions', 'users'] })
      .then((roles) => roles.map((e) => CreateRoleInput.fromEntity(e)));
  }

  async findOne(id: string) {
    return await this.repo
      .findOne(id)
      .then((role) => CreateRoleInput.fromEntity(role));
  }

  async update(id: string, updateRoleInput: UpdateRoleInput) {
    return await this.repo.save({ ...updateRoleInput });
  }

  async remove(id: string) {
    const roleToDelete = await this.findOne(id);
    await this.repo.delete(roleToDelete);
    return roleToDelete;
  }
}
