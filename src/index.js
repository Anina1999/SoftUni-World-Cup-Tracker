import express from 'express';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes.js';
import { authMiddleware } from './middlewares/auth.middleware.js';

const app = express();

//Setup handlebars as the view engine
app.engine('hbs', engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

//Setup static files
app.use(express.static('src/public'));

//Add cors
app.use(cors());

//Add body parsing middleware
app.use(express.urlencoded());

//Add cookie parsing middleware
app.use(cookieParser());

//Auth middleware
app.use(authMiddleware);

//Routes
app.use(routes);

//Start the server
app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
})