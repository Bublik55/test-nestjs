import { ApiProperty } from '@nestjs/swagger';
import { Column, Table, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  timestamps: false,
})
export class Columns extends Model<Columns> {
  @ApiProperty()
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ApiProperty()
  @Column
  user_id: string;

  @ApiProperty()
  @Column
  content: string;
}
