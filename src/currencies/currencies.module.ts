import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesRepository } from './currencies.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService, CurrenciesRepository, PrismaService],
})
export class CurrenciesModule {}
