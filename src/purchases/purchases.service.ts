import { Injectable } from '@nestjs/common';
import Purchase from 'src/Interfaces/Purchase';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PurchasesService {
   constructor(private readonly prisma: PrismaService) {}

   async getPurchases(): Promise<Array<Purchase>> {
      return await this.prisma.purchases.findMany();
   }

   async register(data: Purchase): Promise<Purchase> {
      return await this.prisma.purchases.create({ data });
   }

   async update(id: number, data: Purchase): Promise<Purchase> {
      return await this.prisma.purchases.update({ where: { id: id }, data: data })
   }

   async delete(id: number): Promise<Purchase> {
      return this.prisma.purchases.delete({ where: { id: id } });
   }
}

