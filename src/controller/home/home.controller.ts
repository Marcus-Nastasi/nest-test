import { Controller, Get, Render } from '@nestjs/common';

@Controller('home')
export class HomeController {

   @Get('')
   @Render('index.html')
   getHome() {
      return
   }
}
