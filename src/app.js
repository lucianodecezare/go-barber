import 'dotenv/config';
import express from 'express';
import { resolve } from 'path';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import 'express-async-errors';

import './database';
import { Badges } from './utils';
import { routes } from './routes';
import sentryConfig from './config/sentry';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  // Register middlewares
  middlewares() {
    console.log(`\n${Badges.INFO}Starting middlewares`);

    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  // Register Routes
  routes() {
    console.log(`${Badges.INFO}Starting routes`);
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  // Add exception middleware
  exceptionHandler() {
    this.server.use(async (error, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(error, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

const { server } = new App();

export { server };
