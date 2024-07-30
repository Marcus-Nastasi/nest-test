import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import RegisterDTO from 'DTOs/User/RegisterDTO';
import UpdateDTO from 'DTOs/User/UpdateDTO';
import IUser from 'Interfaces/IUser';

@Controller('users')
export class UsersController {

   constructor(private readonly service: UsersService) {}

   @Get()
   async get(@Headers('authorization') header: string, @Res() res: Response) {
      if (!header) return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'invalid header' }).end();
      const users: Array<IUser> = await this.service.get(header.replace('Bearer ', ''));
      if (!users) return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'invalid user or token expired' }).end();
      return res.status(HttpStatus.OK).json({ users }).end();
   }

   @Get('/:id')
   async getUnique(@Param('id') id: string, @Headers('authorization') header: string, @Res() res: Response) {
      if (!header) return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'invalid header' }).end();
      const users: IUser = await this.service.getUnique(header.replace('Bearer ', ''), Number(id));
      if (!users) return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'invalid user or token expired' }).end();
      return res.status(HttpStatus.OK).json({ user: users }).end();
   }

   @Post('register')
   async create(@Body() data: RegisterDTO, @Headers('authorization') header: string, @Res() res: Response) {
      if (!header) return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'invalid header' }).end();
      const user: IUser = await this.service.create(data, header);
      if (!user) return res.status(401).json({ error: 'invalid user or token expired' }).end();
      return res.status(201).json({ user: user }).end();
   }

   @Put('update/:id')
   async update(@Param('id') id: number, @Body() data: UpdateDTO, @Headers('authorization') header: string, @Res() res: Response) {
      if (!header) return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'invalid header' }).end();
      const user: IUser = await this.service.update(id, data, header);
      return res.status(201).json({ user: user }).end();
   }

   @Delete('delete/:id')
   async delete(@Param('id') id: number, @Headers('authorization') header: string, @Res() res: Response) {
      if (!header) return res.status(HttpStatus.UNAUTHORIZED).json({ error: 'invalid header' }).end();
      const deleted_user: IUser = await this.service.delete(id, header);
      return res.status(202).json({ user: deleted_user }).end();
   }
}

