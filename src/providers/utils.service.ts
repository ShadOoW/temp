/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PageOptionsDto } from '@src/common/dto/page-options.dto';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { RedisService } from 'nestjs-redis';
import { In, Like } from 'typeorm';

export class UtilsService {
  /**
   * convert entity to dto class instance
   * @param {{new(entity: E, options: any): T}} model
   * @param {E[] | E} entity
   * @param options
   * @returns {T[] | T}
   */
  // public static toDto<T, E>(
  //   model: new (entity: E, options?: any) => T,
  //   entity: E,
  //   options?: any,
  // ): T;
  // public static toDto<T, E>(
  //   model: new (entity: E, options?: any) => T,
  //   entity: E[],
  //   options?: any,
  // ): T[];
  public static toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E | E[],
    options?: any,
  ): T | T[] {
    if (_.isArray(entity)) {
      //@ts-ignore
      return entity.map((u) => new model(u, options));
    }
    // @ts-ignore
    return new model(entity, options);
  }

  /**
   * generate hash from password or string
   * @param {string} password
   * @returns {string}
   */
  static generateHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  /**
   * generate random string
   * @param length
   */
  static generateRandomString(length: number) {
    return Math.random()
      .toString(36)
      .replace(/[^a-zA-Z0-9]+/g, '')
      .substr(0, length);
  }

  /**
   * validate text with hash
   * @param {string} password
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  static validateHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash || '');
  }

  /**
   * set user id on redis => key: user.id,  value: socketId
   * @param redisService
   * @param userId
   * @param socketId
   */
  static async setUserIdAndSocketIdOnRedis(
    redisService: RedisService,
    userId: string,
    socketId: string,
  ) {
    await redisService
      .getClient()
      .set(`users:${userId}`, socketId, 'NX', 'EX', 30);
  }

  static getOptions(args) {
    const whereArgs = {};
    Object.keys(args).map((key) => {
      if (
        args[key] !== undefined &&
        args[key] !== null &&
        key !== 'order' &&
        key !== 'take' &&
        key !== 'page'
      ) {
        if (key !== 'search' && key !== 'searchBy') {
          if (_.isArray(args[key])) whereArgs[key] = In(args[key]);
          else whereArgs[key] = args[key];
        } else {
          whereArgs[args['searchBy']] = Like(`%${args['search']}%`);
        }
      }
    });
    return whereArgs;
  }

  static pagination(args: PageOptionsDto) {
    const { order, take, page } = args;
    return {
      order: {
        createdAt: order,
      },
      take,
      skip: (page - 1) * take,
    };
  }

  static getMinDiff(date) {
    const today = new Date();
    const lastDate = new Date(date);
    const diffMs = today.valueOf() - lastDate.valueOf();
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    return diffMins;
  }
}
