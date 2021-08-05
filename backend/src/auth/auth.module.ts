import { Module } from '@nestjs/common';
import CitizenAuthModule from './citizen/auth.module';
import RepresentativeAuthModule from './representative/auth.module';

@Module({
  imports: [CitizenAuthModule, RepresentativeAuthModule],
})
export class AuthModule {}
