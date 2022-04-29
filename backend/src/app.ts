import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import Handlebars from 'handlebars';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { engine } from 'express-handlebars';
import { apiRouter } from './routes';

const app = express();

mongoose.connect('mongodb://localhost:27017/Platform');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('fileUpload'));
app.use(fileUpload({}));

app.use(apiRouter);

app.set('view engine', '.hbs');
app.engine('.hbs', engine({
    defaultLayout: false,
    handlebars: allowInsecurePrototypeAccess(Handlebars),
}));
app.set('views', path.join(__dirname, 'static'));

const PORT = 5000;

app.listen(PORT, async () => {
    console.log(`Service has started on ${PORT} port...`);
});
