import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
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
import { CreateCardDto } from 'src/dtos';
import { UserEntity } from 'src/entities';
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

  @ApiProperty({type: UserEntity})
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

  @HasMany(() => Comments)
  comments: Comments
}
