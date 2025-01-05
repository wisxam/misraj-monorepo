import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CapsuleService } from './capsule.service';
import { CreateCapsuleDto } from './dto/create.capsule.dto';
import { UpdateCapsuleDto } from './dto/update.capsule.dto';
import { Capsule } from '@prisma/client';
import { JwtAuthGuard } from '../guards';

@Controller('capsule')
@UseGuards(JwtAuthGuard)
export class CapsuleController {
  constructor(private readonly capsuleService: CapsuleService) {}

  @Get(':capsuleId')
  async getCapsule(
    @Param('capsuleId') capsuleId: string,
    @Req() req: any
  ): Promise<Capsule> {
    const userId = req.user.userId;

    await this.capsuleService.verifiedUserCapsule(userId, capsuleId);

    return this.capsuleService.getCapsule(capsuleId);
  }

  @Get()
  async getCapsules(@Req() req: any): Promise<Capsule[]> {
    const userId = req.user.userId;

    return this.capsuleService.getCapsules(userId);
  }

  @Post()
  async createCapsule(
    @Body() dto: CreateCapsuleDto,
    @Req() req: any
  ): Promise<Capsule> {
    const userId = req.user.userId;

    return this.capsuleService.createCapsule(dto, userId);
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
