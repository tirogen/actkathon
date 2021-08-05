import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Citizen, CitizenDocument } from './user.schema';

// const INVITE_TTL_MINS = 60 * 24 * 7;
// const INVITE_BASE_URL = 'https://zenbrief.com/invite';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Citizen.name) private citizenModel: Model<CitizenDocument>,
    private configService: ConfigService,
  ) {}

  findByPhone(phone: string) {
    phone = phone.replace('+', '');
    return this.citizenModel.findOne({ phoneNumber: phone }).exec();
  }

  async me(phone: string) {
    const user = await this.findByPhone(phone);
    // const credit = await this.billService.getCurrentCreditByTeamOwner(String(user.teamOwner));
    return {
      phoneNumber: user.phoneNumber,
    };
  }

  create(user: Citizen) {
    const newUser = new this.citizenModel(user);
    return newUser.save();
  }
}
