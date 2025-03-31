import { WalletsRepository } from './wallets.repository';
import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletsService {
  constructor(private walletsRepository: WalletsRepository) {}

  findUserWallets(userId: string) {
    return this.walletsRepository.findAll(userId);
  }

  findOne(id: string, userId: string) {
    return this.walletsRepository.findOneById(id, userId);
  }

  create(createWalletDto: CreateWalletDto, userId: string) {
    return this.walletsRepository.create(createWalletDto, userId);
  }

  update(id: string, updateWalletDto: UpdateWalletDto, userId: string) {
    return this.walletsRepository.update(id, updateWalletDto, userId);
  }

  remove(id: string, userId: string) {
    return this.walletsRepository.delete(id, userId);
  }
}
