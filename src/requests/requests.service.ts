import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '../shared/ERROR_MESSAGES';
import { Injectable } from '@nestjs/common';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { Request } from '../requests/entities/request.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request) private readonly repo: Repository<Request>,
    private subscriptionService: SubscriptionsService,
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
        id: requestEntity.to?.id,
        email: requestEntity.to?.email,
        username: requestEntity.to?.username,
      },
      status: requestEntity.status,
      createdAt: requestEntity.createdAt,
    };
  }

  async create(createRequestInput: CreateRequestInput) {
    const { from, to } = createRequestInput;
    try {
      console.log(from, to);
      const publicRequest = await this.repo.findOne({
        where: { from, status: 'created' },
      });
      const privateRequest = to
        ? await this.repo.findOne({
            where: { from, to, status: 'created' },
          })
        : null;

      if (publicRequest) {
        if (privateRequest || !to)
          throw new HttpException(
            ERROR_MESSAGES.CANNOT_CREATE,
            HttpStatus.BAD_REQUEST,
          );
      }
      return this.repo
        .save(createRequestInput)
        .then((request) => this.getRequest(request));
    } catch (error) {
      throw new HttpException(
        ERROR_MESSAGES.CANNOT_CREATE,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(args = null) {
    const { take, skip } = args;
    delete args.take;
    delete args.skip;
    const [requests, totalCount] = await this.repo.findAndCount({
      where: args,
      relations: ['to', 'from'],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });
    return { requests, totalCount };
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
    if (request.status === 'accepted' || request.status === 'refused') {
      throw new HttpException(
        ERROR_MESSAGES.CANNOT_UPDATE,
        HttpStatus.NOT_MODIFIED,
      );
    }
    const updatedRequest = await this.repo.save({ id, ...updateRequestInput });

    if (status == 'accepted') {
      this.subscriptionService.create({
        subscriber: request.from,
        subscribedTo: request.to,
      });
    }

    return updatedRequest;
  }

  async remove(id: string) {
    const requestToDelete = await this.findOne(id);
    await this.repo.delete(requestToDelete);
    return requestToDelete;
  }
}
