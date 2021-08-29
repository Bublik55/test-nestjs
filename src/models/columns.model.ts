import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Users } from './';

@Table({
  timestamps: false,
})
export class Columns extends Model<Columns> {
  @ApiProperty()
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @BelongsTo(() => Users)
  author: Users;

  @ApiProperty()
  @ForeignKey(() => Users)
  @Column
  author_id: string;

  @ApiProperty()
  @Column
  content: string;
}
