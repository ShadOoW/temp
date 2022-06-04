import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { EmailsService } from '@src/modules/users/emails/emails.service';
import { UsersService } from '@src/modules/users/users/users.service';
import { UtilsService } from '@src/providers/utils.service';
import { SENDFILE_SUBJECT, SENDFILE_TEMPLATE } from '@src/shared/emails';
import { ERROR_MESSAGES } from '@src/shared/ERROR_MESSAGES';
import { In, Repository } from 'typeorm';
import { CreateFileInput } from './dto/create-file.input';
import { FilesPageOptionsDto } from './dto/files-page-options.dto';
import { FilesPageDto } from './dto/files-page.dto';
import { UpdateFileInput } from './dto/update-file.input';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity) private readonly repo: Repository<FileEntity>,
    private usersService: UsersService,
    private emailService: EmailsService,
  ) {}

  async create(createFileInput: CreateFileInput, user: any) {
    const createdFile = await this.repo.create({ ...createFileInput, user });
    const savedFile = await this.repo.save(createdFile);
    return await this.findOne(savedFile.id);
  }

  async filesM2m(
    pageOptionsDto: FilesPageOptionsDto,
    mentor: string,
    mentee: string,
  ) {
    const fileQ = this.repo.findAndCount({
      join: {
        alias: 'files',
        leftJoin: {
          user: 'files.user',
          tags: 'files.tags',
          sharedWith: 'files.sharedWith',
        },
      },
      where: (qb) => {
        qb.where({
          user: mentor,
          status: 'shared',
        });
        qb.andWhere('sharedWith.id = :mentee', { mentee });
        qb.orWhere(
          'user.id = :mentee AND sharedWith.id = :mentor AND files.status = :status',
          {
            mentee,
            mentor,
            status: 'shared',
          },
        );
      },
      relations: [
        'tags',
        'user',
        'sharedWith',
        'user.profile',
        'sharedWith.profile',
      ],
      ...UtilsService.pagination(pageOptionsDto),
    });
    const [files, filesCount] = await fileQ;
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: filesCount,
    });
    return new FilesPageDto(files.toDtos(), pageMetaDto);
  }

  async findAll(
    pageOptionsDto: FilesPageOptionsDto,
    user,
  ): Promise<FilesPageDto> {
    const opts = {
      relations: [
        'tags',
        'user',
        'sharedWith',
        'user.profile',
        'sharedWith.profile',
      ],
      ...UtilsService.pagination(pageOptionsDto),
    };
    const fileQ = user.isAdmin
      ? this.repo.findAndCount(opts)
      : this.repo.findAndCount({
          join: {
            alias: 'files',
            leftJoin: {
              user: 'files.user',
              tags: 'files.tags',
              sharedWith: 'files.sharedWith',
            },
          },
          where: (qb) => {
            qb.where({
              user: user.id,
              status: pageOptionsDto.status
                ? pageOptionsDto.status
                : In(['created', 'updated', 'shared']),
            });
            if (pageOptionsDto.tags) {
              qb.andWhere('tags.id = :id', { id: pageOptionsDto.tags });
              if (!pageOptionsDto.status)
                qb.orWhere(
                  'sharedWith.id = :userId AND tags.id = :id AND files.status != :status',
                  {
                    userId: user.id,
                    id: pageOptionsDto.tags,
                    status: 'deleted',
                  },
                );
            } else {
              if (!pageOptionsDto.status)
                qb.orWhere(
                  'sharedWith.id = :userId AND files.status != :status',
                  {
                    userId: user.id,
                    status: 'deleted',
                  },
                );
            }
          },
          ...opts,
        });
    const [files, filesCount] = await fileQ;
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: filesCount,
    });
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
    const file = await this.repo.findOne({ id }, { relations: ['user'] });
    console.log(file);
    if (!file) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdFile = await this.repo.create({ id, ...updateFileInput });
    await this.repo.save(createdFile);
    const sendEmailPromise = updateFileInput.sharedWith.map((sendTo) =>
      this.sendFileEmail(file.user.id, sendTo),
    );
    await Promise.all(sendEmailPromise);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const fileToDelete = await this.findOne(id);
    await this.repo.delete(id);
    return fileToDelete;
  }

  async sendFileEmail(createdById: any, sendToId: any) {
    const createdBy = await this.usersService.findOne(createdById);
    const sendTo = await this.usersService.findOne(sendToId);
    if (!createdBy && !sendTo) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (sendTo && createdBy) {
      await this.emailService.sendMail(
        SENDFILE_TEMPLATE,
        sendTo.email,
        SENDFILE_SUBJECT,
        {
          firstName: sendTo.profile?.firstName,
          lastName: sendTo.profile?.lastName,
        },
      );
    }
  }
}
