import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { hashSync } from 'bcryptjs';
import { Model } from 'mongoose';
import { BillService } from 'src/bill/bill.service';
import { adminPermission, managerPermission, UserRole } from 'src/constant/user.enum';
import { EmailService } from 'src/email/email.service';
import { encrypt } from 'src/utils/encrypt';
import { InviteMemberDto, UpdateProfileDto } from './user.dto';
import { User, UserDocument } from './user.schema';

const INVITE_TTL_MINS = 60 * 24 * 7;
const INVITE_BASE_URL = 'https://zenbrief.com/invite';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
    private emailService: EmailService,
    @Inject(forwardRef(() => BillService))
    private billService: BillService,
  ) {}

  async can({ userId, targetUserId, actionRole }: { userId: string; targetUserId?: string; actionRole?: UserRole }) {
    const user = await this.findById(userId);
    if (!targetUserId) {
      if (
        user.role === UserRole.Owner ||
        (user.role === UserRole.Admin && adminPermission.includes(actionRole)) ||
        (user.role === UserRole.Manager && managerPermission.includes(actionRole))
      ) {
        return;
      }
      throw new ForbiddenException("Don't have permission to do this.");
    }
    const targetUser = await this.userModel.findOne({ _id: targetUserId }).populate('teamOwner').exec();
    const isSameTeam = String(user.teamOwner._id) === String(targetUser.teamOwner._id);
    const isTeamOwner = user.role === UserRole.Owner && isSameTeam;
    const isTeamAdmin = user.role === UserRole.Admin && isSameTeam;
    const isTeamManager = user.role === UserRole.Manager && isSameTeam;
    if (
      isTeamOwner ||
      (isTeamAdmin &&
        adminPermission.includes(targetUser.role) &&
        (!actionRole || (actionRole && adminPermission.includes(actionRole)))) ||
      (isTeamManager &&
        managerPermission.includes(targetUser.role) &&
        (!actionRole || (actionRole && managerPermission.includes(actionRole))))
    ) {
      return;
    }
    throw new ForbiddenException("Don't have permission to do this.");
  }

  findById(userId: string, password?: boolean, populate?: boolean) {
    if (password) {
      if (populate) return this.userModel.findById(userId, '+password').populate('teamOwner').exec();
      return this.userModel.findById(userId, '+password').exec();
    }
    if (populate) return this.userModel.findOne({ _id: userId }).populate('teamOwner').exec();
    return this.userModel.findOne({ _id: userId }).exec();
  }

  async me(userId: string) {
    const user = await this.findById(userId);
    const credit = await this.billService.getCurrentCreditByTeamOwner(String(user.teamOwner));
    return {
      platformLanguage: user.platformLanguage,
      defaultLanguage: user.defaultLanguage,
      defaultCountry: user.defaultCountry,
      role: user.role === UserRole.Owner ? UserRole.Admin : user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      credit,
    };
  }

  async findByEmail(email: string, password?: boolean) {
    if (password) {
      return this.userModel.findOne({ email }, '+password').exec();
    }
    return this.userModel.findOne({ email }).exec();
  }

  create(user: User) {
    user.password = hashSync(user.password);
    user.passwordChangedDate = new Date();
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  changePassword(userId: string, newPassword: string) {
    const password = hashSync(newPassword);
    const passwordChangedDate = new Date();
    return this.userModel.findByIdAndUpdate(userId, { password, passwordChangedDate }, { new: true }).exec();
  }

  async getPasswordChangedDate(userId: string) {
    const user = await this.userModel.findById(userId, '+passwordChangedDate').exec();
    return user.passwordChangedDate;
  }

  updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    return this.userModel.findByIdAndUpdate(userId, updateProfileDto, { new: true }).exec();
  }

  async disableMe(userId: string) {
    return this.userModel.findByIdAndUpdate(userId, { isActive: false }, { new: true }).exec();
  }

  async disableMember(userId: string, targetUserId: string) {
    await this.can({ userId, targetUserId });
    return this.userModel.findByIdAndUpdate(targetUserId, { isActive: false }, { new: true }).exec();
  }

  async updateRole(userId: string, targetUserId: string, userRole: UserRole) {
    await this.can({ userId, targetUserId, actionRole: userRole });
    return this.userModel.findByIdAndUpdate(targetUserId, { role: userRole }, { new: true }).exec();
  }

  async findTeamMembers(userId: string) {
    const teamOwner = await this.findById(userId);
    const members = await this.userModel.find({ teamOwner, isActive: true }).exec();
    return members.map((member) => ({
      id: member._id,
      platformLanguage: member.platformLanguage,
      defaultLanguage: member.defaultLanguage,
      defaultCountry: member.defaultCountry,
      role: member.role === UserRole.Owner ? UserRole.Admin : member.role,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
    }));
  }

  async inviteMember(userId: string, inviteMemberDto: InviteMemberDto) {
    for (const invite of inviteMemberDto.invites) {
      await this.can({ userId, actionRole: invite.role });
    }
    for (const invite of inviteMemberDto.invites) {
      const inviteEncryptKey = this.configService.get<string>('inviteEncryptKey');
      const encryptedText = await encrypt(invite, inviteEncryptKey, INVITE_TTL_MINS);
      await this.emailService.sendInvite(invite.email, `${INVITE_BASE_URL}/${encryptedText}`);
    }
  }
}
