import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import IUser from 'Interfaces/IUser';

export class RegisterDTO {
   name: string;
   cpf: string;
}

@Injectable()
export class UsersService {
   constructor(private readonly prisma: PrismaService, private readonly auth: AuthService) {}

   async get(token: string): Promise<Array<IUser>> {
      if (!token) return null;
      if (!this.auth.validate(token)) return null;
      return await this.prisma.users.findMany();
   }

   async create(data: RegisterDTO, header: string) {
      if (!header) return null;
      const token: string = header.replace('Bearer ', '');
      if (!this.auth.validate(token)) return null;
      return await this.prisma.users.create({ data });
   }

   async update(id: number, data: RegisterDTO, header: string) {
      if (!header) return null;
      const token: string = header.replace('Bearer ', '');
      if (!this.auth.validate(token)) return null;
      return await this.prisma.users.update({ where: { id: Number(id) }, data: data })
   }

   async delete(id: number, header: string) {
      if (!header) return null;
      const token: string = header.replace('Bearer ', '');
      if (!this.auth.validate(token)) return null;
      return await this.prisma.users.delete({ where: { id: Number(id) } });
   }
}

