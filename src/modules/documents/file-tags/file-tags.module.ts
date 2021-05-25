import { Module } from '@nestjs/common';
import { FileTagsService } from './file-tags.service';
import { FileTagsResolver } from './file-tags.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileTagEntity } from './entities/file-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileTagEntity])],
  providers: [FileTagsResolver, FileTagsService],
})
export class FileTagsModule {}
