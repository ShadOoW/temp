import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private readonly repo: Repository<Profile>,
  ) {}
  create(createProfileInput: CreateProfileInput) {
    return this.repo.save(createProfileInput).then((e) => e);
  }

  async findOne(id: string) {
    return await this.repo
      .findOne(id, { relations: ['domains'] })
      .then((profile) => profile);
  }

  async update(id: string, updateProfileInput: UpdateProfileInput) {
    const profile = await this.repo.findOne({ id });
    if (!profile) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.repo.save({ id, ...updateProfileInput });
  }
}
