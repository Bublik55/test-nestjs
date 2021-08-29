import {
  Column,
  Table,
  Model,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';

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
}
