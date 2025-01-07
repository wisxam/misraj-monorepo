import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { ICrypt } from '../lib/bcrypt';
import { UserRepository } from '../infra/repositories/user.repository';
import { UserWithoutPassword } from '../dto/userRequest.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    @Inject('ICrypt') private cryptService: ICrypt
  ) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<UserWithoutPassword> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const check = await this.cryptService.comparePassword(
      password,
      user.password
    );
    if (!check) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(user: UserWithoutPassword) {
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      ...payload,
      token,
    };
  }
}
