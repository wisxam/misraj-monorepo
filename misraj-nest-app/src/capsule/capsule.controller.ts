import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CapsuleService } from './capsule.service';
import { CreateCapsuleDto } from './dto/create.capsule.dto';
import { UpdateCapsuleDto } from './dto/update.capsule.dto';
import { Capsule } from '@prisma/client';
import { JwtAuthGuard } from '../guards';

@UseGuards(JwtAuthGuard)
@Controller('capsule')
export class CapsuleController {
  constructor(private readonly capsuleService: CapsuleService) {}

  @Get('allCaps')
  async getAllCapsules(): Promise<Capsule[]> {
    return this.capsuleService.getAllCapsules();
  }

  @Get(':capsuleId')
  async getCapsule(
    @Param('capsuleId') capsuleId: string
    // @Req() req: any
  ): Promise<Capsule> {
    // const userId = req.user.userId;

    // await this.capsuleService.verifiedUserCapsule(userId, capsuleId);

    return this.capsuleService.getCapsule(capsuleId);
  }

  @Get()
  async getCapsules(
    @Req() req: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<{ capsules: Capsule[]; totalCount: number }> {
    const userId = req.user.userId;

    const { capsules, totalCount } = await this.capsuleService.getCapsules(
      userId,
      page,
      limit
    );

    return { capsules, totalCount };
  }

  @Post()
  async createCapsule(
    @Body() dto: CreateCapsuleDto,
    @Req() req: any
  ): Promise<Capsule> {
    const userId = req.user.userId;

    const capsule = await this.capsuleService.createCapsule(
      {
        ...dto,
        remainingTime: this.capsuleService.calculateRemainingTime(
          dto.releaseDate
        ),
      },
      userId
    );

    return capsule;
  }

  @Patch(':capsuleId')
  async patchCapsule(
    @Param('capsuleId') capsuleId: string,
    @Req() req: any,
    @Body() dto: UpdateCapsuleDto
  ): Promise<Capsule> {
    const userId = req.user.userId;

    return this.capsuleService.patchCapsule(dto, capsuleId, userId);
  }

  @Delete(':capsuleId')
  async deleteCapsule(
    @Param('capsuleId') capsuleId: string,
    @Req() req: any
  ): Promise<{ message: string }> {
    const userId = req.user.userId;

    return this.capsuleService.deleteCapsule(capsuleId, userId);
  }
}
