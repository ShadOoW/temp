import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { RedisService } from 'nestjs-redis';

export class UtilsService {
  /**
   * convert entity to dto class instance
   * @param {{new(entity: E, options: any): T}} model
   * @param {E[] | E} entity
   * @param options
   * @returns {T[] | T}
   */
  public static toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E,
    options?: any,
  ): T;
  public static toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E[],
    options?: any,
  ): T[];
  public static toDto<T, E>(
    model: new (entity: E | E[], options?: any) => T,
    entity: E | E[],
    options?: any,
  ): T | T[] {
    if (_.isArray(entity)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return entity.map((u) => new model(u, options));
    }

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
      .set(`users:${userId}`, socketId, 'NX', 'EX', 3600);
  }

  static getOptions(args) {
    Object.keys(args).map((key) => {
      if (args[key] === undefined) delete args[key];
    });
    return args;
  }
}
