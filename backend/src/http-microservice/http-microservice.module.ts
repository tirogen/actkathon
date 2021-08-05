import { Global, HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>('microservice.endpoint'),
        headers: {
          'X-API-Key': configService.get<string>('microservice.key'),
          'content-type': 'application/json',
        },
      }),
    }),
  ],
  exports: [HttpModule],
})
export class HttpMicroserviceModule {}
