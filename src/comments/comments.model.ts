import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  timestamps: false,
})
export class Comments extends Model<Comments> {
  @Column
  author_id: string;

  @Column
  card_id: string;

  @Column
  content: string;
}
