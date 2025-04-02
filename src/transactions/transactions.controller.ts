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
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';
import { RequestWithUser } from 'src/types/request-with-user';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Auth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.transactionsService.findAllForUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.transactionsService.findOneForUser(id, req.user.userId);
  }

  @Post()
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Request() req: RequestWithUser,
  ) {
    return this.transactionsService.create(
      createTransactionDto,
      req.user.userId,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Request() req: RequestWithUser,
  ) {
    return this.transactionsService.update(
      id,
      updateTransactionDto,
      req.user.userId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.transactionsService.delete(id, req.user.userId);
  }
}
