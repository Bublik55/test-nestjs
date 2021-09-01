import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany
} from 'sequelize-typescript';
import { Users,Cards } from './';

@Table({
  timestamps: false,
})
export class Columns extends Model<Columns> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @BelongsTo(() => Users)
  author: Users;

  @ForeignKey(() => Users)
  @Column
  author_id: number;

  @Column
  content: string;

  @HasMany(() => Cards)
  cards: Cards[];
}
