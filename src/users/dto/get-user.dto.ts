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

  public static getUser(userEntity: any): any {
    return {
      id: userEntity.id,
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      username: userEntity.username,
      email: userEntity.email,
      phone: userEntity.phone,
      picture: userEntity.picture,
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
