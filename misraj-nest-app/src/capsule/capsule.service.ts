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

    if (capsule.status === 'RELEASED') {
      if (capsule.remainingTime && capsule.remainingTime >= 0) {
        await this.capsuleRepository.patchCapsule(
          { remainingTime: 0 },
          capsule.id
        );
      }
      return capsule;
    }

    const remainingTime = this.calculateRemainingTime(capsule.releaseDate);

    if (remainingTime === 0) {
      await this.capsuleRepository.updateCapsuleStatus(capsuleId, 'RELEASED');
    } else {
      await this.capsuleRepository.updateRemainingTime(
        capsuleId,
        remainingTime
      );
    }

    return capsule;
  }

  async getAllCapsules(): Promise<Capsule[]> {
    return this.capsuleRepository.getAllCapsules();
  }

  async verifiedUserCapsule(userId: number, capsuleId: string): Promise<void> {
    const capsule = await this.getCapsule(capsuleId);

    if (userId !== capsule.userId)
      throw new UnauthorizedException(
        "You're not allowed to access this capsule"
      );
  }

  async getCapsules(
    userId: number,
    page: number = 1,
    limit: number = 10
  ): Promise<{ capsules: Capsule[]; totalCount: number }> {
    const skip = (page - 1) * limit;

    const { capsules, totalCount } = await this.capsuleRepository.getCapsules(
      userId,
      skip,
      limit
    );

    if (!capsules.length) throw new NotFoundException('No capsules found');

    await Promise.all(
      capsules.map(async (capsule) => {
        if (capsule.status === 'RELEASED') {
          if (capsule.remainingTime && capsule.remainingTime >= 0) {
            await this.capsuleRepository.patchCapsule(
              { remainingTime: 0 },
              capsule.id
            );
          }
        } else {
          const remainingTime = this.calculateRemainingTime(
            capsule.releaseDate
          );

          if (remainingTime === 0) {
            await this.capsuleRepository.updateCapsuleStatus(
              capsule.id,
              'RELEASED'
            );
          } else {
            await this.capsuleRepository.updateRemainingTime(
              capsule.id,
              remainingTime
            );
          }
        }
      })
    );

    return { capsules, totalCount };
  }

  async createCapsule(dto: CreateCapsuleDto, userId: number): Promise<Capsule> {
    return this.capsuleRepository.createCapsule(dto, userId);
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

  calculateRemainingTime(releaseDate: Date): number {
    const now = new Date();
    const release = new Date(releaseDate);
    return Math.max(release.getTime() - now.getTime(), 0);
  }
}
