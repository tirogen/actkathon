import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PublicAPI } from './decorators/public-api.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @PublicAPI()
  getHello(): string {
    return this.appService.getHello();
  }
}
