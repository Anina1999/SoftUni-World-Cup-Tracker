import { Router } from "express";
import { authController, homeController, matchController } from './controllers/index.js';
import { isAuth, isGuest } from "./middlewares/auth.middleware.js";

const routes = Router();

routes.get('/', homeController.getHomePage);

routes.get('/auth/register', isGuest, authController.getRegisterPage);
routes.post('/auth/register', isGuest, authController.register);

routes.get('/auth/login', isGuest, authController.getLoginPage);
routes.post('/auth/login', isGuest, authController.login);

routes.get('/auth/logout', isAuth, authController.logout);

routes.get('/match/create', isAuth, matchController.getMatchPage); 
routes.post('/match/create', isAuth, matchController.create); 

routes.post('/match/dashboard', matchController.create);

export default routes;