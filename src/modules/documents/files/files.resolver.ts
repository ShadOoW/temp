import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User as CurrentUser } from '@src/decorators/user.decorator';
import { CreateFileInput } from './dto/create-file.input';
import { FileDto } from './dto/file.dto';
import { FilesPageOptionsDto } from './dto/files-page-options.dto';
import { FilesPageDto } from './dto/files-page.dto';
import { UpdateFileInput } from './dto/update-file.input';
import { FilesService } from './files.service';

@Resolver(() => FileDto)
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @Mutation(() => FileDto)
  createFile(
    @Args('createFileInput') createFileInput: CreateFileInput,
    @CurrentUser() user,
  ) {
    return this.filesService.create(createFileInput, { id: user.id });
  }

  @Query(() => FilesPageDto, { name: 'files' })
  findAll(
    @Args() pageOptionsDto: FilesPageOptionsDto,
    @CurrentUser() user,
  ): Promise<FilesPageDto> {
    return this.filesService.findAll(pageOptionsDto, user);
  }

  @Query(() => FilesPageDto, { name: 'filesM2m' })
  filesM2m(
    @Args() pageOptionsDto: FilesPageOptionsDto,
    @Args('mentor', { type: () => String }) mentor: string,
    @Args('mentee', { type: () => String }) mentee: string,
  ): Promise<FilesPageDto> {
    return this.filesService.filesM2m(pageOptionsDto, mentor, mentee);
  }

  @Query(() => FileDto, { name: 'file' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.filesService.findOne(id);
  }

  @Mutation(() => FileDto)
  updateFile(
    @Args('id', { type: () => String }) id: string,
    @Args('updateFileInput') updateFileInput: UpdateFileInput,
  ) {
    return this.filesService.update(id, updateFileInput);
  }

  @Mutation(() => FileDto)
  removeFile(@Args('id', { type: () => String }) id: string) {
    return this.filesService.remove(id);
  }
}

