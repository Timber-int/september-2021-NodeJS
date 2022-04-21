import 'reflect-metadata';
import express from 'express';
// import mongoose from 'mongoose';
import path from 'path';
import { engine } from 'express-handlebars';
import { createConnection } from 'typeorm';
import fileUpload from 'express-fileupload';
import { apiRouter } from './routes';
import { config } from './config';
import { cronRunner } from './cron';

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', '.hbs');
app.engine('.hbs', engine({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'emailTemplates'));

// mongoose.connect('mongodb://localhost:27017/School');

app.use(apiRouter);

const { PORT } = config;

app.listen(PORT, async () => {
    console.log(`Server has been started on ${PORT} port...`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected...');
            await cronRunner();
        }
    } catch (e) {
        if (e) {
            console.log(e);
        }
    }
});
