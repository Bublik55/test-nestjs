import { ApiProperty } from '@nestjs/swagger';
import { Column, Table, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

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
  @Column
  author_id: string;

  @ApiProperty()
  @Column
  column_id: string;

  @ApiProperty()
  @Column
  content: string;
}