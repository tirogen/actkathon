import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, MinLength } from 'class-validator';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type RepresentativeDocument = Representative & Document;

@Schema({ timestamps: true })
export class Representative {
  _id?: mongoose.Schema.Types.ObjectId;

  @IsString()
  @MinLength(1)
  @ApiProperty({ required: true, default: 'Nonzaka' })
  @Prop({ required: true, type: String })
  firstName: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({ required: true, default: 'Noruma' })
  @Prop({ required: true, type: String })
  lastName: string;

  @IsPhoneNumber('TH')
  @ApiProperty({ required: true, default: '+66918814300' })
  @Prop({ required: true, type: Number, unique: true })
  phoneNumber: string;

  // @IsUrl()
  @Prop({ type: String })
  profileImage: string;
}

export const RepresentativeSchema = SchemaFactory.createForClass(Representative);
