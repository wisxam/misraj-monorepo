import { User } from '@prisma/client';

export class UserMapper {
  static toResponse(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  static toResponseList(user: User[]) {
    return user.map((user) => this.toResponse(user));
  }
}
