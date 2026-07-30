import { Router } from "express";
import { authController, homeController } from './controllers/index.js';

const routes = Router();

routes.get('/', homeController.getHomePage);
routes.get('/auth/register', authController.getRegisterPage);
routes.post('/auth/register', authController.register);
routes.get('/auth/login', authController.getLoginPage);
routes.post('/auth/login', authController.login);
routes.get('/auth/logout', authController.logout);

export default routes;