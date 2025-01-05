import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from '../auth/auth.module';
import { CapsuleModule } from '../capsule/capsule.module';

@Module({
  imports: [UserModule, AuthModule, CapsuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
