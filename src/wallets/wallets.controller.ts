import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RequestWithUser } from 'src/types/request-with-user';

@Auth()
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.walletsService.findUserWallets(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.walletsService.findOne(id, req.user.userId);
  }

  @Post()
  create(
    @Body() createWalletDto: CreateWalletDto,
    @Request() req: RequestWithUser,
  ) {
    return this.walletsService.create(createWalletDto, req.user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWalletDto: UpdateWalletDto,
    @Request() req: RequestWithUser,
  ) {
    return this.walletsService.update(id, updateWalletDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.walletsService.remove(id, req.user.userId);
  }
}
