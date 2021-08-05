import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class AuthCredentialsDto {
  @IsPhoneNumber('TH')
  @ApiProperty({ required: true, default: '+66918814300' })
  phoneNumber: string;
}

export class AuthResponseDto {
  access_token: string;
}
