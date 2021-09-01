import { Exclude } from 'class-transformer';
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
  /*@TODO 
	Добавить конструктор  Users( data: CreateUserDto) ? и по аналогии в других
	*/
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  email: string;

  @HasMany(() => Columns)
  columns: Columns[];
  @HasMany(() => Cards)
  cards: Cards[];
  @HasMany(() => Comments)
  comments: Comments[];
}
