import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import { authMiddleware } from './app/middlewares/auth';

import AppointmentController from './app/controllers/AppointmentController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import ScheduleController from './app/controllers/ScheduleController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

const routes = new Router();
const upload = multer(multerConfig);

// No auth
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

// Auth
routes.use(authMiddleware);

// Appointment
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);

// Files
routes.post('/files', upload.single('file'), FileController.store);

// Providers
routes.get('/providers', ProviderController.index);

// Schedule
routes.get('/schedule', ScheduleController.index);

// Users
routes.put('/users', UserController.update);

export { routes };
