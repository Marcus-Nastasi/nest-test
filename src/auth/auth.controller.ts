import {Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import { Response } from 'express';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import IUser from 'src/Interfaces/IUser';

@Controller('auth')
export class AuthController {
   constructor(private readonly service: AuthService, private readonly prisma: PrismaService) {}

   @Post('login')
   async login(@Body() data: IUser, @Res() res: Response) {
      try {
         const user: IUser = await this.prisma.users.findFirst({ where: { name: data.name, cpf: data.cpf } });
         if (!user || user.name !== data.name || user.cpf !== data.cpf) return res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ data: [ { status: HttpStatus.UNAUTHORIZED, message: 'Invalid user' } ] })
            .end();
         return res
            .status(HttpStatus.ACCEPTED)
            .json({ data: [ { token: this.service.generate(user.cpf) } ] })
            .end();
      } catch (e: any) {
         return res.status(500).json({ error: e.message }).end();
      }
   }
}

