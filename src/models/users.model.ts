import {
  Column,
  Table,
  Model,
  AutoIncrement,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';
import { Columns, Cards, Comments } from './';

@Table({
  timestamps: false,
})
export class Users extends Model<Users> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  password: string;

  @Column
  email: string;

  @HasMany(() => Columns)
  columns: Columns[];
  @HasMany(() => Cards)
  cards: Cards[];
/*  @HasMany(() => Comments)
  comments: Comments[];
*/}
