import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

import { Badges } from '../../utils';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN
      },
      { sequelize }
    );

    this.addHook('beforeSave', (user) => {
      if (user.password) {
        user.password_hash = bcrypt.hashSync(user.password, 8);
      }
    });

    console.log(`${Badges.SUCCESS}User model`);

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export { User };
