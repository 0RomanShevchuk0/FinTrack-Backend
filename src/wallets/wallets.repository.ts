import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { Wallet } from '@prisma/client';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletsRepository {
  constructor(private prisma: PrismaService) {}

  async findAllForUser(userId: string): Promise<Wallet[]> {
    return this.prisma.wallet.findMany({ where: { user_id: userId } });
  }

  async findOneByIdForUser(id: string, userId: string): Promise<Wallet | null> {
    return this.prisma.wallet.findUnique({ where: { id, user_id: userId } });
  }

  async createForUser(
    createWalletDto: CreateWalletDto,
    userId: string,
  ): Promise<Wallet | null> {
    return this.prisma.wallet.create({
      data: { ...createWalletDto, user_id: userId },
    });
  }

  async updateForUser(id: string, updateWalletDto: UpdateWalletDto, userId: string) {
    return this.prisma.wallet.update({
      where: { id, user_id: userId },
      data: updateWalletDto,
    });
  }

  async deleteForUser(id: string, userId: string): Promise<Wallet | null> {
    return this.prisma.wallet.delete({ where: { id, user_id: userId } });
  }
}
