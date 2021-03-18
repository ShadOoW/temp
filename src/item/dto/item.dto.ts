import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { Item } from '../entities/item.entity';
import { User } from '../../users/entities/user.entity';

export class ItemDto implements Readonly<ItemDto> {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  @ApiProperty({ required: true })
  @IsString()
  authorId: string;

  @ApiProperty({ required: true })
  @IsBoolean()
  isPublished: boolean;

  public static from(dto: Partial<ItemDto>) {
    const it = new ItemDto();
    it.id = dto.id;
    it.name = dto.name;
    it.description = dto.description;
    return it;
  }

  public static fromEntity(entity: Item) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description,
    });
  }

  public toEntity(user: User = null) {
    const it = new Item();
    it.id = this.id;
    it.name = this.name;
    it.description = this.description;
    it.createdAt = new Date();
    it.createdBy = 'dododoo';
    it.updatedBy = 'dododoo';
    return it;
  }
}
