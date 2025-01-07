import { Injectable } from '@nestjs/common';
import { Capsule, CapsuleStatus } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';
import { UpdateCapsuleDto } from '../../capsule/dto/update.capsule.dto';

interface CreateCapsule {
  title: string;
  content?: string;
  image?: string;
  releaseDate: Date;
}

@Injectable()
export class CapsuleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createCapsule(dto: CreateCapsule, userId: number): Promise<Capsule> {
    return this.prismaService.capsule.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  getAllCapsules() {
    return this.prismaService.capsule.findMany();
  }

  findMany(where: any): Promise<Capsule[]> {
    return this.prismaService.capsule.findMany(where);
  }

  updateRemainingTime(
    capsuleId: string,
    remainingTime: number
  ): Promise<Capsule> {
    return this.prismaService.capsule.update({
      where: { id: capsuleId },
      data: {
        remainingTime,
      },
    });
  }

  updateCapsuleStatus(
    capsuleId: string,
    status: CapsuleStatus
  ): Promise<Capsule> {
    return this.prismaService.capsule.update({
      where: { id: capsuleId },
      data: {
        status,
      },
    });
  }

  getCapsule(capsuleId: string): Promise<Capsule | null> {
    return this.prismaService.capsule.findUnique({
      where: {
        id: capsuleId,
      },
    });
  }

  async getCapsules(
    userId: number,
    skip: number = 0,
    take: number = 10
  ): Promise<{ capsules: Capsule[]; totalCount: number }> {
    const [capsules, totalCount] = await Promise.all([
      this.prismaService.capsule.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: Number(take),
      }),
      this.prismaService.capsule.count({
        where: {
          userId,
        },
      }),
    ]);

    return { capsules, totalCount };
  }

  deleteCapsule(capsuleId: string): Promise<Capsule> {
    return this.prismaService.capsule.delete({
      where: {
        id: capsuleId,
      },
    });
  }

  patchCapsule(dto: UpdateCapsuleDto, capsuleId: string): Promise<Capsule> {
    return this.prismaService.capsule.update({
      where: {
        id: capsuleId,
      },
      data: dto,
    });
  }
}
