import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LanguagesService } from './languages.service';
import { CreateLanguageInput } from './dto/create-language.input';
import { UpdateLanguageInput } from './dto/update-language.input';
import { Public } from '@shared/public.decorator';
import { LanguageDto } from './dto/language.dto';
import { LanguagesPageDto } from './dto/languages-page.dto';
import { LanguagesPageOptionsDto } from './dto/languages-page-options.dto';

@Resolver(() => LanguageDto)
export class LanguagesResolver {
  constructor(private readonly languagesService: LanguagesService) {}

  @Mutation(() => LanguageDto)
  createLanguage(
    @Args('createLanguageInput')
    createLanguageInput: CreateLanguageInput,
  ): Promise<LanguageDto> {
    return this.languagesService.create(createLanguageInput);
  }

  @Public()
  @Query(() => LanguagesPageDto, { name: 'languages' })
  findAll(
    @Args() pageOptionsDto: LanguagesPageOptionsDto,
  ): Promise<LanguagesPageDto> {
    return this.languagesService.findAll(pageOptionsDto);
  }

  @Query(() => LanguageDto, { name: 'language' })
  findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<LanguageDto> {
    return this.languagesService.findOne(id);
  }

  @Mutation(() => LanguageDto)
  updateLanguage(
    @Args('id', { type: () => String }) id: string,
    @Args('updateLanguageInput')
    updateLanguageInput: UpdateLanguageInput,
  ): Promise<LanguageDto> {
    return this.languagesService.update(id, updateLanguageInput);
  }

  @Mutation(() => LanguageDto)
  removeLanguage(
    @Args('id', { type: () => String }) id: string,
  ): Promise<LanguageDto> {
    return this.languagesService.remove(id);
  }
}
