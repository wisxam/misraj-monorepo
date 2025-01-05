import { Module } from '@nestjs/common';
import { BcryptService } from '../lib/bcrypt';
import { InfraModule } from '../infra/infra.module';
import { JwtModule } from '@nestjs/jwt';
import { CapsuleService } from './capsule.service';
import { CapsuleController } from './capsule.controller';

@Module({
  imports: [
    InfraModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    CapsuleService,
    {
      provide: 'ICrypt',
      useClass: BcryptService,
    },
  ],
  controllers: [CapsuleController],
})
export class CapsuleModule {}
