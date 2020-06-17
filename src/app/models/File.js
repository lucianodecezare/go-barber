import Sequelize, { Model } from 'sequelize';

import { Badges } from '../../utils';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING
      },
      { sequelize }
    );

    console.log(`${Badges.SUCCESS}File model`);

    return this;
  }
}

export { File };
