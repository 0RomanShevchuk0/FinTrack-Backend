import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { Wallet } from '@prisma/client';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Wallet[]> {
    return this.prisma.wallet.findMany();
  }

  async findOneById(id: string): Promise<Wallet | null> {
    return this.prisma.wallet.findUnique({ where: { id } });
  }

  async create(createWalletDto: CreateWalletDto): Promise<Wallet | null> {
    return this.prisma.wallet.create({ data: createWalletDto });
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    return this.prisma.wallet.update({
      where: { id },
      data: updateWalletDto,
    });
  }

  async delete(id: string): Promise<Wallet | null> {
    return this.prisma.wallet.delete({ where: { id } });
  }
}
