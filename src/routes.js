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

routes.get('/match/dashboard', matchController.getDashboardPage);

routes.get('/match/:matchId/details', matchController.showDetailsPage);
routes.get('/match/:matchId/like', isAuth, matchController.hitLike);

routes.get('/match/:matchId/edit', isAuth, matchController.getEditPage);

routes.get('/match/:matchId/delete', isAuth, matchController.removeMatch);

export default routes;