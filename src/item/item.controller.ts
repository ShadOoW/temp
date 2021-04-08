import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from '../item/entities/item.entity';
import { User } from '../users/decorators/user.decorator';
import { User as IUser } from '../users/entities/user.entity';
import { CaslAbilityFactory, AppAbility } from '../casl/casl-ability.factory';
import { ItemDto } from '../item/dto/item.dto';
import { PoliciesGuard } from '../casl/guards/check-policies.guard';
import { CheckPolicies } from '../casl/decorators/check-policies.decorator';
import { Actions } from '../shared/actions';

@Controller('items')
export class ItemController {
  constructor(
    private serv: ItemService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Get()
  @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Item))
  public async getAll(): Promise<ItemDto[]> {
    return await this.serv.getAll();
  }

  @Post()
  public async post(
    @User() user: IUser,
    @Body() dto: ItemDto,
  ): Promise<ItemDto> {
    return this.serv.create(dto, user);
  }
}
