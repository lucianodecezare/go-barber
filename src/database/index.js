import Sequelize from 'sequelize';

import { File } from '../app/models/File';
import { User } from '../app/models/User';
import { Badges } from '../utils';

import databaseConfig from '../config/database';

const models = [File, User];

class Database {
  constructor() {
    this.init();
  }

  // Start db and load models
  init() {
    this.connection = new Sequelize(databaseConfig);

    console.log(`${Badges.INFO}Starting models`);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

// Exporting 'default' because this will be used just once
export default new Database();
