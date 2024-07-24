import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeController } from './controller/home/home.controller';
import { HomeService } from './service/home/home.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, UsersModule, UsersModule],
  controllers: [AppController, HomeController],
  providers: [AppService, HomeService],
})
export class AppModule {}
