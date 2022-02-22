import express from 'express';

const app = express();

const PORT = 5500;

app.listen(PORT,()=>{
    console.log(`Server has been started on ${PORT} port...`);
});