import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import countryCodes from 'src/constant/country-codes';
import languageCodes from 'src/constant/language-codes';
import { UserRole } from 'src/constant/user.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id?: mongoose.Schema.Types.ObjectId;

  @IsString()
  @MinLength(1)
  @ApiProperty({ required: true })
  @Prop({ required: true, type: String })
  firstName: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({ required: true })
  @Prop({ required: true, type: String })
  lastName: string;

  @IsEmail()
  @MinLength(3)
  @ApiProperty({ required: true })
  @Prop({ required: true, type: String })
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ required: true })
  @Prop({ required: true, type: String, select: false })
  password: string;

  @IsDate()
  @IsOptional()
  @Prop({ required: true, type: Date, precision: 6, select: false, default: new Date() })
  passwordChangedDate: Date;

  @IsBoolean()
  @IsOptional()
  @Prop({ required: true, type: Boolean, default: false })
  isEmailConfirmed: boolean;

  @IsString()
  @IsOptional()
  @Prop({ required: true, type: String, enum: UserRole, default: UserRole.Owner })
  role: UserRole;

  @IsString()
  @IsOptional()
  @Prop({ required: true, type: String, enum: countryCodes, default: 'us' })
  defaultCountry: string;

  @IsString()
  @IsOptional()
  @Prop({ required: true, type: String, enum: languageCodes, default: 'en' })
  defaultLanguage: string;

  @IsString()
  @IsOptional()
  @Prop({ required: true, type: String, enum: languageCodes, default: 'en' })
  platformLanguage: string;

  @IsBoolean()
  @IsOptional()
  @Prop({ required: true, type: Boolean, default: true })
  isActive: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: function () {
      return this._id;
    },
    autopopulate: true,
  })
  teamOwner: User;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ teamOwner: 1 });
