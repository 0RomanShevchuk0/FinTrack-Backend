import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get()
  @Auth()
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.walletsService.findOne(id);
  }

  @Post()
  @Auth()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(id, updateWalletDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.walletsService.remove(id);
  }
}
