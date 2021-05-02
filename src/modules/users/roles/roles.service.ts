import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { RoleEntity } from './entities/role.entity';
import { RoleDto } from './dto/role.dto';
import { RolesPageDto } from './dto/roles-page.dto';
import { RolesPageOptionsDto } from './dto/roles-page-options.dto';
import { UtilsService } from '@src/providers/utils.service';

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
    const createdRole = await this.repo.create(createRoleInput);
    return (await this.repo.save(createdRole)).toDto();
  }

  async findByNames(names) {
    return (
      await this.repo.find({
        where: { name: In(names) },
      })
    ).toDtos();
  }

  async findAll(pageOptionsDto: RolesPageOptionsDto): Promise<RolesPageDto> {
    const { order, take, page } = pageOptionsDto;
    const [roles, rolesCount] = await this.repo.findAndCount({
      relations: ['permissions'],
      order: {
        createdAt: order,
      },
      take,
      skip: UtilsService.skip(page, take),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: rolesCount,
    });
    return new RolesPageDto(roles.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    const role = await this.repo.findOne(id);
    return role ? role.toDto() : null;
  }

  async update(id: string, updateRoleInput: UpdateRoleInput) {
    const role = await this.repo.findOne({ id });
    if (!role) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdRole = await this.repo.create({ id, ...updateRoleInput });
    return (await this.repo.save(createdRole)).toDto();
  }

  async remove(id: string) {
    const roleToDelete = await this.repo.findOne(id);
    await this.repo.delete(id);
    return roleToDelete.toDto();
  }
}
