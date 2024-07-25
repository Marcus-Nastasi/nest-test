import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import IUser from 'Interfaces/IUser';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
   constructor(private readonly service: AuthService, private readonly prisma: PrismaService) {}

   @Post('login')
   async login(@Body() data: IUser) {
      const user = this.prisma.users.findUnique(
         { where: { id: Number(data.id) } }
      );
      if (!user) return { statusCode: HttpStatus.FORBIDDEN, message: 'Invalid user' }
      return { data: this.service.generate((await user).cpf) }
   }
}

