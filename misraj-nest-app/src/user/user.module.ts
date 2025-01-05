import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { BcryptService } from '../lib/bcrypt';
import { UserService } from './user.service';
import { InfraModule } from '../infra/infra.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    InfraModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    UserService,
    {
      provide: 'ICrypt',
      useClass: BcryptService,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
