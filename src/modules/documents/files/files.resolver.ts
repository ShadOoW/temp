import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { CreateFileInput } from './dto/create-file.input';
import { UpdateFileInput } from './dto/update-file.input';
import { FileDto } from './dto/file.dto';
import { FilesPageOptionsDto } from './dto/files-page-options.dto';
import { FilesPageDto } from './dto/files-page.dto';

@Resolver(() => FileDto)
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @Mutation(() => FileDto)
  createFile(@Args('createFileInput') createFileInput: CreateFileInput) {
    return this.filesService.create(createFileInput);
  }

  @Query(() => [FileDto], { name: 'files' })
  findAll(@Args() pageOptionsDto: FilesPageOptionsDto): Promise<FilesPageDto> {
    return this.filesService.findAll(pageOptionsDto);
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
