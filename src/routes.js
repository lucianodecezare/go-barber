import { Router } from 'express';

import { authMiddleware } from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

const routes = new Router();

// No auth
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

// Users
routes.put('/users', UserController.update);

export { routes };
