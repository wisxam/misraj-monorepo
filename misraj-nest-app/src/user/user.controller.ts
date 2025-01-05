import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserMapper } from './user.mapper';
import { CreateUserDto } from './dto/create.user.dto';
import { JwtAuthGuard } from '../guards';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getMany() {
    const users = await this.userService.getMany();

    return UserMapper.toResponseList(users);
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body);

    return UserMapper.toResponse(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getUserProfile(@Param('userId', new ParseIntPipe()) userId: number) {
    const user = await this.userService.getOne(userId);

    return UserMapper.toResponse(user);
  }
}
