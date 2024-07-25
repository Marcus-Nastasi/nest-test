import { Header, Headers, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';

export class RegisterDTO {
   name: string;
   cpf: string;
}

@Injectable()
export class UsersService {
   constructor(private readonly prisma: PrismaService, private readonly auth: AuthService) {}

   async get(header: string) {
      if (!header) return null;
      const token: string = header.replace('Bearer ', '');
      if (!this.auth.validate(token)) return null;
      return this.prisma.users.findMany();
   }

   async create(data: RegisterDTO, header: string) {
      if (!header) return { status: HttpStatus.FORBIDDEN };
      const token: string = header.replace('Bearer ', '');
      if (!this.auth.validate(token)) return { status: HttpStatus.FORBIDDEN };
      return this.prisma.users.create({ data });
   }

   async update(id: number, data: RegisterDTO, header: string) {
      if (!header) return { status: HttpStatus.FORBIDDEN };
      const token: string = header.replace('Bearer ', '');
      if (!this.auth.validate(token)) return { status: HttpStatus.FORBIDDEN };
      return this.prisma.users.update({ where: { id: Number(id) }, data: data })
   }

   async delete(id: number, header: string) {
      if (!header) return { status: HttpStatus.FORBIDDEN };
      const token: string = header.replace('Bearer ', '');
      if (!this.auth.validate(token)) return { status: HttpStatus.FORBIDDEN };
      return this.prisma.users.delete({ where: { id: Number(id) } });
   }
}

