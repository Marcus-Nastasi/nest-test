import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';
import IUser from 'Interfaces/IUser';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
   constructor(private readonly service: AuthService, private readonly prisma: PrismaService) {}

   @Post('login')
   async login(@Body() data: IUser, @Res() res: Response) {
      const user = await this.prisma.users.findUnique({ where: { id: Number(data.id) } });

      if (!user) return res.status(401).json({ status: HttpStatus.UNAUTHORIZED, message: 'Invalid user' }).end();
      
      return res.status(HttpStatus.ACCEPTED).json({ token: this.service.generate(user.cpf) }).end();
   }
}

