import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RegisterDTO, UsersService } from './users.service';

@Controller('users')
export class UsersController {
   constructor(private readonly service: UsersService) {}

   @Get()
   async get() {
      return this.service.get();
   }

   @Post('register')
   async create(@Body() data: RegisterDTO) {
      return this.service.create(data);
   }

   @Put('update/:id')
   async update(@Param('id') id: number, @Body() data: RegisterDTO) {
      return this.service.update(id, data);
   }

   @Delete('delete/:id')
   async delete(@Param('id') id: number) {
      return this.service.delete(id);
   }
}

