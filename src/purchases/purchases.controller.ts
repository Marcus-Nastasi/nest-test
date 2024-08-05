import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import Purchase from 'src/Interfaces/Purchase';

@Controller('purchase')
export class PurchasesController {
   constructor(private readonly service: PurchasesService) {}

   @Get()
   async getPurchases() {
      return await this.service.getPurchases();
   }

   @Post('register')
   async register(@Body() data: Purchase) {
      return await this.service.register(data);
   }

   @Put('update/:id')
   async update(@Param('id') id: string, @Body() data: Purchase) {
      return await this.service.update(Number(id), data);
   }

   @Delete('delete/:id')
   async delete(@Param('id') id: string) {
      return await this.service.delete(Number(id));
   }
}

