import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';

import { RegisterDTO, UsersService } from './users.service';

@Controller('users')
export class UsersController {
   constructor(private readonly service: UsersService) {}

   @Get()
   async get(@Headers('authorization') header: string, @Res() res: Response) {
      if (!header) return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'invalid header' }).end();
      const users = await this.service.get(header.replace('Bearer ', ''));
      if (!users) return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'invalid user' }).end();
      return res.status(HttpStatus.OK).json({ users }).end();
   }

   @Post('register')
   async create(@Body() data: RegisterDTO, @Headers('authorization') header: string, @Res() res: Response) {
      if (!header) return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'invalid header' }).end();
      return this.service.create(data, header);
   }

   @Put('update/:id')
   async update(@Param('id') id: number, @Body() data: RegisterDTO, @Headers('authorization') header: string, @Res() res: Response) {
      if (!header) return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'invalid header' }).end();
      return this.service.update(id, data, header);
   }

   @Delete('delete/:id')
   async delete(@Param('id') id: number, @Headers('authorization') header: string, @Res() res: Response) {
      if (!header) return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'invalid header' }).end();
      return this.service.delete(id, header);
   }
}

