import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FileTagsService } from './file-tags.service';
import { CreateFileTagInput } from './dto/create-file-tag.input';
import { UpdateFileTagInput } from './dto/update-file-tag.input';
import { FileTagDto } from './dto/file-tag.dto';
import { FileTagsPageOptionsDto } from './dto/file-tags-page-options.dto';
import { FileTagsPageDto } from './dto/file-tags-page.dto';
import { User as CurrentUser } from '@src/decorators/user.decorator';

@Resolver(() => FileTagDto)
export class FileTagsResolver {
  constructor(private readonly fileTagsService: FileTagsService) {}

  @Mutation(() => FileTagDto)
  createFileTag(
    @Args('createFileTagInput') createFileTagInput: CreateFileTagInput,
    @CurrentUser() user,
  ) {
    return this.fileTagsService.create(createFileTagInput, { id: user.id });
  }

  @Query(() => FileTagsPageDto, { name: 'fileTags' })
  findAll(
    @Args() pageOptionsDto: FileTagsPageOptionsDto,
    @CurrentUser() user,
  ): Promise<FileTagsPageDto> {
    return this.fileTagsService.findAll(pageOptionsDto, user);
  }

  @Query(() => FileTagDto, { name: 'fileTag' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.fileTagsService.findOne(id);
  }

  @Mutation(() => FileTagDto)
  updateFileTag(
    @Args('id', { type: () => String }) id: string,
    @Args('updateFileTagInput') updateFileTagInput: UpdateFileTagInput,
  ) {
    return this.fileTagsService.update(id, updateFileTagInput);
  }

  @Mutation(() => FileTagDto)
  removeFileTag(@Args('id', { type: () => String }) id: string) {
    return this.fileTagsService.remove(id);
  }
}
