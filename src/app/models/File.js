import Sequelize, { Model } from 'sequelize';

import { Badges } from '../../utils';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          }
        }
      },
      { sequelize }
    );

    console.log(`${Badges.SUCCESS}File model`);

    return this;
  }
}

export { File };
