import { Router } from "express";
import { authController, homeController } from './controllers/index.js';

const routes = Router();

routes.get('/', homeController.getHomePage);
routes.get('/auth/register', authController.register);

export default routes;