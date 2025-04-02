import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { Transaction, TransactionType } from '@prisma/client';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionWithWallet } from 'src/types/transaction.types';
import { WalletsService } from 'src/wallets/wallets.service';

@Injectable()
export class TransactionsRepository {
  constructor(
    private prisma: PrismaService,
    private walletsService: WalletsService,
  ) {}

  async findAllForUser(userId: string): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({ where: { user_id: userId } });
  }

  async findOneByIdForUser(
    id: string,
    userId: string,
  ): Promise<Transaction | null> {
    return this.prisma.transaction.findUnique({
      where: { id, user_id: userId },
    });
  }

  private getTransactionImpact(type: TransactionType, amount: number): number {
    return type === 'INCOME' ? amount : -amount;
  }

  private calculateNewBalance(currentBalance: number, impact: number): number {
    return currentBalance + impact;
  }

  async createWithWalletUpdate(
    createTransactionDto: CreateTransactionDto,
    userId: string,
  ): Promise<TransactionWithWallet | null> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const newTransaction = await tx.transaction.create({
          data: { ...createTransactionDto, user_id: userId },
        });

        const wallet = await this.walletsService.findOneForUser(
          newTransaction.wallet_id,
          userId,
        );

        if (!wallet) {
          throw new Error('Wallet not found');
        }

        const transactionImpact = this.getTransactionImpact(
          newTransaction.type,
          +newTransaction.amount,
        );

        const newBalance = this.calculateNewBalance(
          +wallet.balance,
          transactionImpact,
        );

        const updatedWallet = await tx.wallet.update({
          where: { id: newTransaction.wallet_id, user_id: userId },
          data: { balance: newBalance },
        });

        return { transaction: newTransaction, wallet: updatedWallet };
      });
    } catch (error) {
      console.error('Transaction create error:', error);
      throw new Error('Failed to create transaction with wallet update');
    }
  }

  async updateWithWalletUpdate(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
    userId: string,
  ): Promise<TransactionWithWallet | null> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const originalTransaction = await tx.transaction.findUnique({
          where: { id: id, user_id: userId },
        });

        if (!originalTransaction) {
          throw new Error('Transaction not found');
        }

        const updatedTransaction = await tx.transaction.update({
          where: { id, user_id: userId },
          data: updateTransactionDto,
        });

        const wallet = await this.walletsService.findOneForUser(
          updatedTransaction.wallet_id,
          userId,
        );

        if (!wallet) {
          throw new Error('Wallet not found');
        }

        const originalTransactionImpact = this.getTransactionImpact(
          originalTransaction.type,
          +originalTransaction.amount,
        );
        const newTransactionImpact = this.getTransactionImpact(
          updatedTransaction.type,
          +updatedTransaction.amount,
        );

        const impactDifference =
          newTransactionImpact - originalTransactionImpact;

        const newBalance = this.calculateNewBalance(
          +wallet.balance,
          impactDifference,
        );

        const updatedWallet = await tx.wallet.update({
          where: { id: updatedTransaction.wallet_id, user_id: userId },
          data: { balance: newBalance },
        });

        return { transaction: updatedTransaction, wallet: updatedWallet };
      });
    } catch (error) {
      console.log('Transaction update error:', error);
      throw new Error('Failed to update transaction with wallet update');
    }
  }

  async deleteWithWalletUpdate(
    id: string,
    userId: string,
  ): Promise<TransactionWithWallet | null> {
    return this.prisma.$transaction(async (tx) => {
      const deletedTransaction = await tx.transaction.delete({
        where: { id, user_id: userId },
      });

      const wallet = await this.walletsService.findOneForUser(
        deletedTransaction.wallet_id,
        userId,
      );

      if (!wallet) {
        throw new Error('Wallet not found');
      }

      const transactionImpact = this.getTransactionImpact(
        deletedTransaction.type,
        +deletedTransaction.amount,
      );

      const newBalance = this.calculateNewBalance(
        +wallet.balance,
        transactionImpact,
      );

      const updatedWallet = await tx.wallet.update({
        where: { id: deletedTransaction.wallet_id, user_id: userId },
        data: { balance: newBalance },
      });

      return { transaction: deletedTransaction, wallet: updatedWallet };
    });
  }
}
