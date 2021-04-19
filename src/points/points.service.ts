import { Injectable } from '@nestjs/common';
import { CreatePointInput } from './dto/create-point.input';
import { UpdatePointInput } from './dto/update-point.input';

@Injectable()
export class PointsService {
  create(createPointInput: CreatePointInput) {
    return 'This action adds a new point';
  }

  findAll() {
    return `This action returns all points`;
  }

  findOne(id: number) {
    return `This action returns a #${id} point`;
  }

  update(id: number, updatePointInput: UpdatePointInput) {
    return `This action updates a #${id} point`;
  }

  remove(id: number) {
    return `This action removes a #${id} point`;
  }
}
