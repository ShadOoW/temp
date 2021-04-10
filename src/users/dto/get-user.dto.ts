import { User } from '../entities/user.entity';

export class GetUserDto {
  public static getUserRequests(userEntity: any): any {
    return {
      id: userEntity.id,
      requestsTo: [
        ...(userEntity.requestsTo || []).map((request) => ({
          id: request.id,
          title: request.title,
          excerpt: request.excerpt,
          status: request.status,
        })),
      ],
      requestsFrom: [
        ...(userEntity.requestsFrom || []).map((request) => ({
          id: request.id,
          title: request.title,
          excerpt: request.excerpt,
          status: request.status,
        })),
      ],
    };
  }

  public static getUser(userEntity: User): any {
    return {
      id: userEntity.id,
      username: userEntity.username,
      email: userEntity.email,
      role: {
        id: userEntity.role?.id,
        name: userEntity.role?.name,
        permissions: [
          ...(userEntity.role?.permissions || []).map((permission) => ({
            id: permission.id,
            name: permission.name,
          })),
        ],
      },
      profile: userEntity.profile,
    };
  }

  public static getUserRolePermissions(userEntity: User): any {
    return {
      id: userEntity.id,
      isAdmin: userEntity.isAdmin,
      role: {
        id: userEntity.role?.id,
        name: userEntity.role?.name,
        permissions: [
          ...(userEntity.role?.permissions || []).map((permission) => ({
            id: permission.id,
            name: permission.name,
          })),
        ],
      },
    };
  }
}
