import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
