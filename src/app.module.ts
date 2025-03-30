import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { AssetsModule } from './assets/assets.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [UsersModule, AuthModule, CurrenciesModule, AssetsModule, WalletsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
