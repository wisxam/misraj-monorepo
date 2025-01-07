import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCapsuleDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsDate()
  @IsNotEmpty()
  releaseDate!: Date;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  remainingTime!: Number;
}
