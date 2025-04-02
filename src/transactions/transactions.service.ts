import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(private transactionsRepository: TransactionsRepository) {}

  findAllForUser(userId: string) {
    return this.transactionsRepository.findAllForUser(userId);
  }

  findOneForUser(id: string, userId: string) {
    return this.transactionsRepository.findOneByIdForUser(id, userId);
  }

  create(createCategoryDto: CreateTransactionDto, userId: string) {
    return this.transactionsRepository.createWithWalletUpdate(
      createCategoryDto,
      userId,
    );
  }

  update(id: string, updateCategoryDto: UpdateTransactionDto, userId: string) {
    return this.transactionsRepository.updateWithWalletUpdate(
      id,
      updateCategoryDto,
      userId,
    );
  }

  delete(id: string, userId: string) {
    return this.transactionsRepository.deleteWithWalletUpdate(id, userId);
  }
}
