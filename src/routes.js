import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

const routes = new Router();

// Session
routes.post('/sessions', SessionController.store);

// Users
routes.post('/users', UserController.store);

export { routes };
