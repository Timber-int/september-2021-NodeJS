const express = require('express');
const {engine} = require('express-handlebars');
const path = require('path');
const apiRoutes = require('./routes/api.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.use(apiRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT} port...`);
});