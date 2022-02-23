import express, { Request, Response } from 'express';

const app = express();

app.use('/', (req: Request, res: Response) => {
    res.end();
});

const PORT = 5500;

app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT} port...`);
});
