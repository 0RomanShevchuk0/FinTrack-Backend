import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './transactions.repository';
import { PrismaService } from 'src/prisma.service';
import { WalletsService } from 'src/wallets/wallets.service';
import { WalletsRepository } from 'src/wallets/wallets.repository';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionsRepository,
    PrismaService,
    WalletsService,
    WalletsRepository,
  ],
})
export class TransactionsModule {}
