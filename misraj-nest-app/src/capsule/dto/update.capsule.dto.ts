import { CapsuleStatus } from '@prisma/client';
import { IsOptional, IsString, IsDate, IsEnum } from 'class-validator';

export class UpdateCapsuleDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsDate()
  releaseDate?: Date;

  @IsOptional()
  @IsEnum(CapsuleStatus)
  status?: CapsuleStatus;
}
