import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly repo: Repository<ProfileEntity>,
  ) {}
  create(createProfileInput: CreateProfileInput) {
    return this.repo.save(createProfileInput).then((e) => e);
  }

  async findOne(id: string) {
    const profile = await this.repo.findOne(id, {
      relations: ['coachingDomains', 'wantedDomain', 'domainExpertise'],
    });
    return profile ? profile.toDto() : null;
  }

  async update(id: string, updateProfileInput: UpdateProfileInput) {
    const profile = await this.repo.findOne({ id });
    if (!profile) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.repo.save({ id, ...updateProfileInput });
    const updatedProfile = await this.repo.findOne(id, {
      relations: ['coachingDomains', 'wantedDomain', 'domainExpertise'],
    });
    return updatedProfile ? updatedProfile.toDto() : null;
  }
}
