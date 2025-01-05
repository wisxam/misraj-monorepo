import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CapsuleRepository } from '../infra/repositories/capsule.repository';
import { Capsule } from '@prisma/client';
import { CreateCapsuleDto } from './dto/create.capsule.dto';
import { UpdateCapsuleDto } from './dto/update.capsule.dto';

@Injectable()
export class CapsuleService {
  constructor(private readonly capsuleRepository: CapsuleRepository) {}

  async getCapsule(capsuleId: string): Promise<Capsule> {
    const capsule = await this.capsuleRepository.getCapsule(capsuleId);

    if (!capsule) throw new NotFoundException('No such capsule exists');

    return capsule;
  }

  async verifiedUserCapsule(userId: number, capsuleId: string): Promise<void> {
    const capsule = await this.getCapsule(capsuleId);

    if (userId !== capsule.userId)
      throw new UnauthorizedException(
        "You're not allowed to access this capsule"
      );
  }

  async getCapsules(userId: number): Promise<Capsule[]> {
    return this.capsuleRepository.getCapsules(userId);
  }

  async createCapsule(dto: CreateCapsuleDto, userId: number): Promise<Capsule> {
    const capsule = await this.capsuleRepository.createCapsule(dto, userId);

    return capsule;
  }

  async deleteCapsule(
    capsuleId: string,
    userId: number
  ): Promise<{ message: string }> {
    await this.verifiedUserCapsule(userId, capsuleId);

    await this.capsuleRepository.deleteCapsule(capsuleId);

    return { message: 'Capsule deleted successfully' };
  }

  async patchCapsule(
    dto: UpdateCapsuleDto,
    capsuleId: string,
    userId: number
  ): Promise<Capsule> {
    await this.verifiedUserCapsule(userId, capsuleId);

    return this.capsuleRepository.patchCapsule(dto, capsuleId);
  }
}
