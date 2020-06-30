import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import { Appointment } from '../app/models/Appointment';
import { File } from '../app/models/File';
import { User } from '../app/models/User';
import { Badges } from '../utils';

import databaseConfig from '../config/database';

const models = [Appointment, File, User];

class Database {
  constructor() {
    this.init();
    this.mongo();
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

  // Start mongo db
  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
      }
    );
  }
}

// Exporting 'default' because this will be used just once
export default new Database();
