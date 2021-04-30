import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionDto } from './dto/permission.dto';
import { PermissionsPageDto } from './dto/permissions-page.dto';
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
    const createdPermission = await this.repo.create(createPermissionInput);
    return (await this.repo.save(createdPermission)).toDto();
  }
  // TODO SKIP & WHERE
  async findAll(pageOptionsDto: PermissionsPageOptionsDto) {
    const { order, take } = pageOptionsDto;
    const [permissions, permissionsCount] = await this.repo.findAndCount({
      order: {
        createdAt: order,
      },
      take,
    });
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
    const updatedPermission = await this.repo.create({
      id,
      ...updatePermissionInput,
    });
    return (await this.repo.save(updatedPermission)).toDto();
  }

  async remove(id: string) {
    const permissionToDelete = await this.repo.findOne(id);
    await this.repo.delete(id);
    return permissionToDelete.toDto();
  }
}
