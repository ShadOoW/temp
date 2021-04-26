import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { Repository, In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { RoleEntity } from './entities/role.entity';
import { RoleDto } from './dto/role.dto';
import { RolesPageDto } from './dto/roles-page.dto';
import { RolesPageOptionsDto } from './dto/roles-page-options.dto';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity) private readonly repo: Repository<RoleEntity>,
  ) {}

  async create(createRoleInput: CreateRoleInput): Promise<RoleDto> {
    const { name } = createRoleInput;
    const role = await this.repo.findOne({ name });
    if (role) {
      throw new HttpException(ERROR_MESSAGES.EXISTED, HttpStatus.BAD_REQUEST);
    }
    return await this.repo.save(createRoleInput);
  }

  async findByNames(names) {
    return await this.repo.find({
      where: { name: In(names) },
    });
  }

  async findAll(pageOptionsDto: RolesPageOptionsDto): Promise<RolesPageDto> {
    const [roles, rolesCount] = await this.repo.findAndCount({
      relations: ['permissions'],
      order: {
        createdAt: 'DESC',
      },
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: rolesCount,
    });
    return new RolesPageDto(roles.toDtos(), pageMetaDto);
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
    return await this.repo.save({ id, ...updateRoleInput });
  }

  async remove(id: string) {
    const roleToDelete = await this.findOne(id);
    await this.repo.delete(id);
    return roleToDelete;
  }
}
