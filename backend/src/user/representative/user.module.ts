import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { Representative, RepresentativeSchema } from './user.schema';
import { UserService } from './user.service';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Representative.name, schema: RepresentativeSchema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class RepresentativeModule {}
