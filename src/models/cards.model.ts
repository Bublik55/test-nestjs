import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import { Users, Columns, Comments } from '.';
@Table({
  timestamps: false,
})
export class Cards extends Model<Cards> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ApiProperty()
  @ForeignKey(() => Users)
  @Column
  author_id: number;

  @BelongsTo(() => Users)
  author: Users;

  @ForeignKey(() => Columns)
  @Column
  column_id: number;

  @BelongsTo(() => Columns)
  column: Columns;
  
  @Column
  content: string;

  @HasMany(() => Comments)
  comments: Comments
}
