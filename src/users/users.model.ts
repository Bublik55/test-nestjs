import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  timestamps: false,
})
export class Users extends Model<Users> {
  @Column
  name: string;

  @Column
  password: string;

  @Column
  email: string;
}
