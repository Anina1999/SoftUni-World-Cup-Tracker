import { Router } from "express";
import { authController, homeController } from './controllers/index.js';

const routes = Router();

routes.get('/', homeController.getHomePage);
routes.get('/auth/register', authController.getRegisterPage);
routes.post('/auth/register', authController.register);
routes.get('/auth/login', authController.getLoginPage);

export default routes;