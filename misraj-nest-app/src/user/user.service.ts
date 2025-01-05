import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserRepository } from '../infra/repositories/user.repository';

import { User } from '@prisma/client';
import type { ICrypt } from '../lib/bcrypt';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,

    @Inject('ICrypt') private cryptService: ICrypt
  ) {}

  getMany() {
    return this.userRepository.getMany();
  }

  async checkUserCredentials(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new ConflictException('Email is already taken');
    }

    return user;
  }

  async getOne(userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const password = await this.cryptService.hashPassword(dto.password);

    await this.checkUserCredentials(dto.email);

    return this.userRepository.create({
      password,
      name: dto.name,
      email: dto.email,
    });
  }
}
