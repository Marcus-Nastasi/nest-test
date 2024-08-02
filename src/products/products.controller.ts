import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ProductsService } from "./products.service";
import PRegisterDTO from "../../DTOs/Products/PRegisterDTO";
import { Response } from "express";
import Product from "../../DTOs/Products/Product";

@Controller('products')
export class ProductsController {
   constructor(private readonly productsService: ProductsService) {}

   @Get()
   async getProducts(@Res() res: Response): Promise<Response<Array<Product>>> {
      const products: Array<Product> = await this.productsService.get();
      if (products.length === 0) return res.status(HttpStatus.NO_CONTENT).end();
      return res.status(200).json({ data: [ products ] }).end();
   }

   @Post('register')
   async productsRegister(@Body() data: PRegisterDTO, @Headers('authorization') token: string, @Res() res: Response): Promise<Response<Product>> {
      if (!token) return res.status(401).end();
      return res.status(201).json({ data: [ await this.productsService.register(data, token.replace('Bearer ', '')) ] });
   }

   @Put('update/:id')
   async updateProduct(@Param('id') id: string, @Body() data: PRegisterDTO, @Headers('authorization') token: string, @Res() res: Response): Promise<Response<Product>> {
      if (!token) return res.status(401).end();
      const updated = await this.productsService.update(data, Number(id), token.replace("Bearer ", ''));
      return res.status(202).json({ data: [ updated ] }).end();
   }

   @Delete('delete/:id')
   async deleteProduct(@Param('id') id: string, @Headers('authorization') token: string, @Res() res: Response): Promise<Response<Product>> {
      if (!token) return res.status(401).end();
      return res.status(202).json({ data: [ await this.productsService.delete(Number(id), token.replace('Bearer ', '')) ] });
   }
}

