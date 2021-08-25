import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user/entities/user.entity';
import { Card } from './models/card/entities/card.entity';
import { Comment } from './models/comment/entities/comment.entity';
import { Column } from './models/column/entities/column.entity';


export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'nest',
      });
      sequelize.addModels([`User`]);
      await sequelize.sync();
      return sequelize;
    },
  },
];