import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { UtilsService } from '@src/providers/utils.service';
import { ERROR_MESSAGES } from '@src/shared/ERROR_MESSAGES';
import { Repository } from 'typeorm';
import { CreateFileTagInput } from './dto/create-file-tag.input';
import { FileTagsPageOptionsDto } from './dto/file-tags-page-options.dto';
import { FileTagsPageDto } from './dto/file-tags-page.dto';
import { UpdateFileTagInput } from './dto/update-file-tag.input';
import { FileTagEntity } from './entities/file-tag.entity';

@Injectable()
export class FileTagsService {
  constructor(
    @InjectRepository(FileTagEntity)
    private readonly repo: Repository<FileTagEntity>,
  ) {}

  async create(createFileTagInput: CreateFileTagInput) {
    const createdFileTag = await this.repo.create(createFileTagInput);
    return (await this.repo.save(createdFileTag)).toDto();
  }

  async findAll(
    pageOptionsDto: FileTagsPageOptionsDto,
  ): Promise<FileTagsPageDto> {
    const [fileTags, fileTagsCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions(pageOptionsDto),
      relations: ['permissions'],
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: fileTagsCount,
    });
    return new FileTagsPageDto(fileTags.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    const fileTag = await this.repo.findOne(id);
    return fileTag ? fileTag.toDto() : null;
  }

  async update(id: string, updateFileTagInput: UpdateFileTagInput) {
    const fileTag = await this.repo.findOne({ id });
    if (!fileTag) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdFileTag = await this.repo.create({
      id,
      ...updateFileTagInput,
    });
    return (await this.repo.save(createdFileTag)).toDto();
  }

  async remove(id: string) {
    const fileTagToDelete = await this.repo.findOne(id);
    await this.repo.delete(id);
    return fileTagToDelete.toDto();
  }
}
