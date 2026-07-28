import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

//Setup handlebars as the view engine
app.engine('hbs', engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

//Setup static files
app.use(express.static('src/public'));

//Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
})