import { Transaction, Wallet } from '@prisma/client';

export type TransactionWithWallet = {
  transaction: Transaction;
  wallet: Wallet;
};
