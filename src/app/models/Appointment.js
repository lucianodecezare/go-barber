import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

import { Badges } from '../../utils';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          }
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, subHours(this.date, 2));
          }
        }
      },
      { sequelize }
    );

    console.log(`${Badges.SUCCESS}Appointment model`);

    return this;
  }

  static associate(models) {
    // Two associations within the same model requires an alias
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export { Appointment };
