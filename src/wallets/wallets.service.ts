import { WalletsRepository } from './wallets.repository';
import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletsService {
  constructor(private walletsRepository: WalletsRepository) {}

  findAll() {
    return this.walletsRepository.findAll();
  }

  findOne(id: string) {
    return this.walletsRepository.findOneById(id);
  }

  create(createWalletDto: CreateWalletDto) {
    return this.walletsRepository.create(createWalletDto);
  }

  update(id: string, updateWalletDto: UpdateWalletDto) {
    return this.walletsRepository.update(id, updateWalletDto);
  }

  remove(id: string) {
    return this.walletsRepository.delete(id);
  }
}
