import { Injectable } from '@nestjs/common';
import { Capsule } from '@prisma/client';
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

  getCapsule(capsuleId: string): Promise<Capsule | null> {
    return this.prismaService.capsule.findUnique({
      where: {
        id: capsuleId,
      },
    });
  }

  getCapsules(userId: number): Promise<Capsule[]> {
    return this.prismaService.capsule.findMany({
      where: {
        userId,
      },
    });
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
