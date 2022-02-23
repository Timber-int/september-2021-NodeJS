import express from 'express';

const app = express();

const PORT = 5000;

app.get('/', (req, res) => {

});

app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT} port...`);
});

