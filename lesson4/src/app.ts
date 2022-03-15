import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { apiRouter } from './routes';
import { config } from './config';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(apiRouter);

const { PORT } = config;

app.listen(PORT, async () => {
    console.log(`Server has been started on ${PORT} port...`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected...');
        }
    } catch (e) {
        if (e) {
            console.log(e);
        }
    }
});
