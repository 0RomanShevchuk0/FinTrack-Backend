import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { WalletsRepository } from './wallets.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [WalletsController],
  providers: [WalletsService, WalletsRepository, PrismaService],
})
export class WalletsModule {}
