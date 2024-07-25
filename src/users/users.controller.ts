import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { RegisterDTO, UsersService } from './users.service';
import IUser from 'Interfaces/IUser';

@Controller('users')
export class UsersController {
   constructor(private readonly service: UsersService) {}

   @Get()
   async get(@Headers('authorization') headers: string, @Res() res: Response) {
      if (!headers) return res.status(401).end();
      const users = this.service.get(headers);
      if (!users) return res.status(401).json({ status: 401 }).end();
      return this.service.get(headers);
   }

   @Post('register')
   async create(@Body() data: RegisterDTO, @Headers('authorization') header: string) {
      return this.service.create(data, header);
   }

   @Put('update/:id')
   async update(@Param('id') id: number, @Body() data: RegisterDTO, @Headers('authorization') header: string) {
      return this.service.update(id, data, header);
   }

   @Delete('delete/:id')
   async delete(@Param('id') id: number, @Headers('authorization') header: string) {
      return this.service.delete(id, header);
   }
}

