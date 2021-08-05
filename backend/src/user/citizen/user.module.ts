import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { Citizen, CitizenSchema } from './user.schema';
import { UserService } from './user.service';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Citizen.name, schema: CitizenSchema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class CitizenModule {}
