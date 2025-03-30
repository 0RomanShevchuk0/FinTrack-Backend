import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { Currency } from '@prisma/client';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Injectable()
export class CurrenciesRepository {
  constructor(private prisma: PrismaService) {}

  async create(createCurrencyDto: CreateCurrencyDto): Promise<Currency | null> {
    return this.prisma.currency.create({ data: createCurrencyDto });
  }

  async findAll(): Promise<Currency[]> {
    return this.prisma.currency.findMany();
  }

  async findOneById(id: string): Promise<Currency | null> {
    return this.prisma.currency.findUnique({ where: { id } });
  }

  async update(id: string, updateCurrencyDto: UpdateCurrencyDto) {
    return this.prisma.currency.update({
      where: { id },
      data: updateCurrencyDto,
    });
  }

  async delete(id: string): Promise<Currency | null> {
    return this.prisma.currency.delete({ where: { id } });
  }
}
