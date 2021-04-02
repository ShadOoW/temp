import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '../shared/ERROR_MESSAGES';
import { Injectable } from '@nestjs/common';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { Request } from '../requests/entities/request.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from '../users/entities/subscription.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request) private readonly repo: Repository<Request>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,
  ) {}

  getRequest(requestEntity: Request): any {
    return {
      id: requestEntity.id,
      title: requestEntity.title,
      description: requestEntity.description,
      from: {
        id: requestEntity.from.id,
        email: requestEntity.from.email,
        username: requestEntity.from.username,
      },
      to: {
        id: requestEntity.to.id,
        email: requestEntity.to.email,
        username: requestEntity.to.username,
      },
      status: requestEntity.status,
      createdAt: requestEntity.createdAt,
    };
  }

  create(createRequestInput: CreateRequestInput) {
    return this.repo
      .save(createRequestInput)
      .then((request) => this.getRequest(request));
  }

  async findAll(args = null) {
    return await this.repo
      .find({ where: args, relations: ['to', 'from'] })
      .then((permissions) =>
        permissions.map((request) => this.getRequest(request)),
      );
  }

  async findOne(id: string) {
    return await this.repo
      .findOne(id, { relations: ['to', 'from'] })
      .then((request) => this.getRequest(request));
  }

  async update(id: string, updateRequestInput: UpdateRequestInput) {
    const { status } = updateRequestInput;
    const request = await this.repo.findOne(id, { relations: ['to', 'from'] });
    if (!request) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatedRequest = await this.repo.save({ ...updateRequestInput });

    if (status == 'accepted') {
      const subscription = new Subscription();
      subscription.subscriber = request.from;
      subscription.subscribedTo = request.to;

      this.subscriptionRepo.save(subscription);
    }

    return updatedRequest;
  }

  async remove(id: string) {
    const requestToDelete = await this.findOne(id);
    await this.repo.delete(requestToDelete);
    return requestToDelete;
  }
}
