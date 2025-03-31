import { WalletsRepository } from './wallets.repository';
import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletsService {
  constructor(private walletsRepository: WalletsRepository) {}

  findAllForUser(userId: string) {
    return this.walletsRepository.findAllForUser(userId);
  }

  findOneForUser(id: string, userId: string) {
    return this.walletsRepository.findOneByIdForUser(id, userId);
  }

  createForUser(createWalletDto: CreateWalletDto, userId: string) {
    return this.walletsRepository.createForUser(createWalletDto, userId);
  }

  updateForUser(id: string, updateWalletDto: UpdateWalletDto, userId: string) {
    return this.walletsRepository.updateForUser(id, updateWalletDto, userId);
  }

  removeForUser(id: string, userId: string) {
    return this.walletsRepository.deleteForUser(id, userId);
  }
}
