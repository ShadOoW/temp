import { Module } from '@nestjs/common';
import { FileTagsService } from './file-tags.service';
import { FileTagsResolver } from './file-tags.resolver';

@Module({
  providers: [FileTagsResolver, FileTagsService],
})
export class FileTagsModule {}
