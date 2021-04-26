import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionDto } from './dto/permission.dto';
import { PermissionsPageDto } from './dto/permissions-page.dto';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { PermissionsPageOptionsDto } from './dto/permissions-page-options.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly repo: Repository<PermissionEntity>,
  ) {}

  async create(
    createPermissionInput: CreatePermissionInput,
  ): Promise<PermissionDto> {
    const { name } = createPermissionInput;
    const exists = await this.repo.findOne({ name });
    if (exists) {
      throw new HttpException(ERROR_MESSAGES.EXISTED, HttpStatus.BAD_REQUEST);
    }
    return (await this.repo.save(createPermissionInput)).toDto();
  }

  async findAll(pageOptionsDto: PermissionsPageOptionsDto) {
    const [permissions, permissionsCount] = await this.repo.findAndCount();
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: permissionsCount,
    });
    return new PermissionsPageDto(permissions.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    return (await this.repo.findOne(id)).toDto();
  }

  async update(id: string, updatePermissionInput: UpdatePermissionInput) {
    const permission = await this.repo.findOne({ id });
    if (!permission) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.repo.save({ id, ...updatePermissionInput });
  }

  async remove(id: string) {
    const permissionToDelete = await this.repo.findOne(id);
    await this.repo.delete(id);
    return permissionToDelete.toDto();
  }
}
