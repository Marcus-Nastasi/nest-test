import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [UsersService, PrismaService, AuthService],
  controllers: [UsersController]
})
export class UsersModule {}

