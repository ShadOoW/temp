import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { UtilsService } from '@src/providers/utils.service';
import { ERROR_MESSAGES } from '@src/shared/ERROR_MESSAGES';
import { Repository } from 'typeorm';
import { CreateFileInput } from './dto/create-file.input';
import { FilesPageOptionsDto } from './dto/files-page-options.dto';
import { FilesPageDto } from './dto/files-page.dto';
import { UpdateFileInput } from './dto/update-file.input';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity) private readonly repo: Repository<FileEntity>,
  ) {}

  async create(createFileInput: CreateFileInput, user: any) {
    const createdFile = await this.repo.create({ ...createFileInput, user });
    const savedFile = await this.repo.save(createdFile);
    return await this.findOne(savedFile.id);
  }

  async findAll(
    pageOptionsDto: FilesPageOptionsDto,
    userId: string,
  ): Promise<FilesPageDto> {
    const [files, filesCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions({
        ...pageOptionsDto,
        status: pageOptionsDto.status
          ? pageOptionsDto.status
          : ['created', 'updated', 'shared'],
        // tags: { id:  },
        user: userId,
      }),
      relations: ['user', 'tags', 'sharedWith'],
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: filesCount,
    });
    return new FilesPageDto(files.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    const file = await this.repo.findOne(id, {
      relations: ['user', 'tags', 'sharedWith'],
    });
    return file ? file.toDto() : null;
  }

  async update(id: string, updateFileInput: UpdateFileInput) {
    const file = await this.repo.findOne({ id });
    if (!file) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdFile = await this.repo.create({ id, ...updateFileInput });
    await this.repo.save(createdFile);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const fileToDelete = await this.findOne(id);
    await this.repo.delete(id);
    return fileToDelete;
  }
}
