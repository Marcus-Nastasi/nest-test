import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export class RegisterDTO {
   name: string;
   cpf: string;
}

@Injectable()
export class UsersService {
   constructor(private readonly prisma: PrismaService) {}

   async get() {
      return this.prisma.users.findMany();
   }

   async create(data: RegisterDTO) {
      return this.prisma.users.create({ data });
   }

   async update(id: number, data: RegisterDTO) {
      return this.prisma.users.update({ where: { id: Number(id) }, data: data })
   }

   async delete(id: number) {
      return this.prisma.users.delete({ where: { id: Number(id) } });
   }
}
