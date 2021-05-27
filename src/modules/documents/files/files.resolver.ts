import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';
import { FileDto } from './dto/file.dto';
import { FilesPageOptionsDto } from './dto/files-page-options.dto';
import { FilesPageDto } from './dto/files-page.dto';
import { User as CurrentUser } from '@src/decorators/user.decorator';

@Resolver(() => FileDto)
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @Mutation(() => FileDto)
  createFile(
    @Args('createFileInput') createFileInput: CreateFileInput,
    @CurrentUser() user,
  ) {
    return this.filesService.create(createFileInput, { id: user });
  }

  @Query(() => FilesPageDto, { name: 'files' })
  findAll(
    @Args() pageOptionsDto: FilesPageOptionsDto,
    @CurrentUser() userId,
  ): Promise<FilesPageDto> {
    return this.filesService.findAll(pageOptionsDto, userId);
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
