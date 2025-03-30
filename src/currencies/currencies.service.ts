import { CurrenciesRepository } from './currencies.repository';
import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Injectable()
export class CurrenciesService {
  constructor(private currenciesRepository: CurrenciesRepository) {}

  findAll() {
    return this.currenciesRepository.findAll();
  }

  findOne(id: string) {
    return this.currenciesRepository.findOneById(id);
  }

  create(createCurrencyDto: CreateCurrencyDto) {
    return this.currenciesRepository.create(createCurrencyDto);
  }

  update(id: string, updateCurrencyDto: UpdateCurrencyDto) {
    return this.currenciesRepository.update(id, updateCurrencyDto);
  }

  remove(id: string) {
    return this.currenciesRepository.delete(id);
  }
}
