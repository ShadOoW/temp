import { Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { CreateLanguageInput } from './dto/create-language.input';
import { UpdateLanguageInput } from './dto/update-language.input';
import { LanguageEntity } from './entities/language.entity';
import { LanguagesPageOptionsDto } from './dto/languages-page-options.dto';
import { LanguagesPageDto } from './dto/languages-page.dto';
import { UtilsService } from '@src/providers/utils.service';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(LanguageEntity)
    private readonly repo: Repository<LanguageEntity>,
  ) {}

  async create(createLanguageInput: CreateLanguageInput) {
    const { name } = createLanguageInput;
    const language = await this.repo.findOne({ name });
    if (language) {
      throw new HttpException(ERROR_MESSAGES.EXISTED, HttpStatus.BAD_REQUEST);
    }
    const createdLanguage = await this.repo.create(createLanguageInput);
    return (await this.repo.save(createdLanguage)).toDto();
  }

  async findAll(pageOptionsDto: LanguagesPageOptionsDto) {
    const [languages, languagesCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions(pageOptionsDto),
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: languagesCount,
    });
    return new LanguagesPageDto(languages.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    const language = await this.repo.findOne(id);
    return language ? language.toDto() : null;
  }

  async update(id: string, updateLanguageInput: UpdateLanguageInput) {
    const language = await this.repo.findOne({ id });
    if (!language) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdLanguage = await this.repo.create({
      id,
      ...updateLanguageInput,
    });
    return (await this.repo.save(createdLanguage)).toDto();
  }

  async remove(id: string) {
    const languageToDelete = await this.repo.findOne(id);
    await this.repo.delete(id);
    return languageToDelete.toDto();
  }
}
