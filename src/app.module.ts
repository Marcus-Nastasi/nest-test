import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeController } from './home/home.controller';
import { HomeService } from './home/home.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PrismaService } from './prisma/prisma.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { PurchasesController } from './purchases/purchases.controller';
import { PurchasesService } from './purchases/purchases.service';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [AppController, HomeController, AuthController, ProductsController, PurchasesController],
  providers: [AppService, HomeService, AuthService, PrismaService, ProductsService, PurchasesService],
})
export class AppModule {}
