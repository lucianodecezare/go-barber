import express from 'express';

import { Badges } from './utils';

import { routes } from './routes';
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  // Register middlewares
  middlewares() {
    console.log(`\n${Badges.INFO}Starting middlewares`);

    this.server.use(express.json());
  }

  // Register Routes
  routes() {
    console.log(`${Badges.INFO}Starting routes`);
    this.server.use(routes);
  }
}

const { server } = new App();

export { server };
