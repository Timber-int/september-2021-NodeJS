import express, { Request, Response } from 'express';
import { users } from './users';

const app = express();

app.use('/', (req: Request, res: Response) => {
    console.log(users);
    res.end();
});

const PORT = 5500;

app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT} port...`);
});
