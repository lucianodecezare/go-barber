import Sequelize, { Model } from 'sequelize';

import { Badges } from '../../utils';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );

    console.log(`${Badges.SUCCESS}User model`);
  }
}

export { User };
