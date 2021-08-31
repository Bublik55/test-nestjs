import {
  Column,
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Cards, Users } from './';

@Table({
  timestamps: false,
})
export class Comments extends Model<Comments> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  @ForeignKey(() => Users)
  author_id: number;
  @BelongsTo(() => Users)
  user: Users;

  @Column
  @ForeignKey(() => Cards)
  card_id: number;

  @BelongsTo(() => Cards)
  cards: Cards;

  @Column
  content: string;
}
