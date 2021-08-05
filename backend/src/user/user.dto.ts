import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import countryCodes from 'src/constant/country-codes';
import languageCodes from 'src/constant/language-codes';
import { UserRole } from 'src/constant/user.enum';

export class UpdateProfileDto {
  @MinLength(3)
  @IsOptional()
  @ApiProperty()
  firstName?: string;

  @MinLength(3)
  @IsOptional()
  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(countryCodes)
  defaultCountry?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(languageCodes)
  defaultLanguage?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(languageCodes)
  platformLanguage?: string;
}
export class UpdateRoleDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;
}

class Invite {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;
}
export class InviteMemberDto {
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Invite)
  invites: Invite[];

  @ApiProperty()
  @IsOptional()
  message?: string;
}
