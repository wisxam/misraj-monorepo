import { Global, Module } from '@nestjs/common';
import repositories from './repositories';
import { PrismaService } from './services/prisma.service';

@Global()
@Module({
  providers: [PrismaService, ...repositories],
  exports: [...repositories],
})
export class InfraModule {}
