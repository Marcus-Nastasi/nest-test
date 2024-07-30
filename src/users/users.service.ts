import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import IUser from 'Interfaces/IUser';
import RegisterDTO from 'DTOs/User/RegisterDTO';
import UpdateDTO from 'DTOs/User/UpdateDTO';

@Injectable()
export class UsersService {

   constructor(private readonly prisma: PrismaService, private readonly auth: AuthService) {}

   async get(token: string): Promise<Array<IUser>> {
      if (!token) return null;
      if (!this.auth.validate(token)) return null;
      return await this.prisma.users.findMany();
   }

   async create(data: RegisterDTO, header: string): Promise<Prisma.Prisma__usersClient<IUser>> {
      if (!header) return null;
      const token: string = header.replace('Bearer ', '');
      if (!this.auth.validate(token)) return null;
      return await this.prisma.users.create({ data });
   }

   async update(id: number, data: UpdateDTO, header: string): Promise<Prisma.Prisma__usersClient<IUser>> {
      if (!header) return null;
      const token: string = header.replace('Bearer ', '');
      if (!this.auth.validate(token)) return null;
      if (!(await this.prisma.users.findUnique({ where: { id: Number(id) } }))) return null;
      return await this.prisma.users.update({ where: { id: Number(id) }, data: data })
   }

   async delete(id: number, header: string): Promise<Prisma.Prisma__usersClient<IUser>> {
      if (!header) return null;
      const token: string = header.replace('Bearer ', '');
      if (!this.auth.validate(token)) return null;
      if (!(await this.prisma.users.findUnique({ where: { id: Number(id) } }))) return null;
      return await this.prisma.users.delete({ where: { id: Number(id) } });
   }
}

