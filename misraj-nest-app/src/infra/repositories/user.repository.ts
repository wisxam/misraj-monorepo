import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: CreateUserRequest): Promise<User> {
    return this.prismaService.user.create({ data: dto });
  }

  getMany(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  getOne(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  findById(id: number) {
    return this.prismaService.user.findFirst({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}

interface CreateUserRequest {
  name: string;
  password: string;
  email: string;
}
