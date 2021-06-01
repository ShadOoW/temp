import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
// import { UtilsService } from '@src/providers/utils.service';
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
    console.log(pageOptionsDto);
    const fileQ = this.repo
      .createQueryBuilder('files')
      .leftJoinAndSelect('files.user', 'user')
      .leftJoinAndSelect('files.tags', 'tags')
      .leftJoinAndSelect('files.sharedWith', 'sharedWith');
    // .where('user.id = :userId OR sharedWith.id = :userId', { userId });
    const statusQ = pageOptionsDto.status
      ? fileQ.where('files.status = :status', {
          status: pageOptionsDto.status,
        })
      : fileQ.where('files.status IN (:...status)', {
          status: ['created', 'updated', 'shared'],
        });
    // console.log('statusQ', await statusQ.getRawMany());
    const tagQ = pageOptionsDto.tags
      ? fileQ.andWhere('tags.id = :id', {
          id: pageOptionsDto.tags,
        })
      : fileQ;
    console.log('tagQ', pageOptionsDto.tags, await tagQ.getRawMany());

    const [files, filesCount] = await statusQ.getManyAndCount();

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: filesCount,
    });
    console.log(files.toDtos());
    return new FilesPageDto(files.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    const file = await this.repo.findOne(id, {
      relations: [
        'user',
        'tags',
        'sharedWith',
        'user.profile',
        'sharedWith.profile',
      ],
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
