import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsResolver } from './requests.resolver';

@Module({
  providers: [RequestsResolver, RequestsService]
})
export class RequestsModule {}
