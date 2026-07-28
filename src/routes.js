import { Router } from "express";
import { homeController } from './controllers/index.js';

const routes = Router();

routes.get('/', homeController.getHomePage);

export default routes;