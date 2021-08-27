import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  timestamps: false,
})
export class User extends Model<User> {
  @Column
  name: string;

  @Column
  password: string;

  @Column
  email: string;
}
