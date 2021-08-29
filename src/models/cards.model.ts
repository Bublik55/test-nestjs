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
import { Users, Columns, Comments } from '.';
@Table({
  timestamps: false,
})
export class Cards extends Model<Cards> {
  @ApiProperty()
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ApiProperty()
  @ForeignKey(() => Users)
  @Column
  author_id: number;

  @ApiProperty()
  @BelongsTo(() => Users)
  author: Users;

  @ApiProperty()
  @ForeignKey(() => Columns)
  @Column
  column_id: number;
  
  @ApiProperty()
  @BelongsTo(() => Columns)
  column: Columns;
  
  @ApiProperty()
  @Column
  content: string;
}
