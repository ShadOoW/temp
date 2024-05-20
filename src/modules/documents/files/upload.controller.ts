import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { User as CurrentUser } from '@src/decorators/user.decorator';

@Controller('upload')
export class UploadController {
  constructor(private fileService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @CurrentUser() user) {
    const url = await this.fileService.uploadFile(file, user.id);
    return {
      message: 'File is uploaded',
      url,
    };
  }

  @Delete(':fileId')
  async deleteFile(@Param('fileId') fileId: string) {
    await this.fileService.deleteFile(fileId);
    return { message: 'File deleted successfully' };
  }
}

