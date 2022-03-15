import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesResolver } from './languages.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from '@users/casl/casl.module';
import { LanguageEntity } from './entities/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity]), CaslModule],
  providers: [LanguagesResolver, LanguagesService],
})
export class LanguagesModule {}
