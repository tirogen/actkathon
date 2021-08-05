import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as dayjs from 'dayjs';
import { BillService } from 'src/bill/bill.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CreditGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
    private readonly billService: BillService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicAPI = this.reflector.getAllAndOverride<boolean>('isPublicAPI', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublicAPI) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = await this.userService.findById(request.user);
    if (!user) {
      throw new NotFoundException("User isn't found");
    }
    const bill = await this.billService.findBillByTeamOwner(String(user.teamOwner));
    if (!bill) {
      throw new BadRequestException('Not found subscription');
    }
    if (bill.credit < 1) {
      throw new BadRequestException("Don't have enough credits");
    }
    if (dayjs(bill.currentPeriodEnd).isBefore(dayjs())) {
      throw new BadRequestException('Your subscription is expired');
    }
    return true;
  }
}
