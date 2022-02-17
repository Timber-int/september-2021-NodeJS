const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');

const users = [
    {
        firstName: 'Jon',
        lastName: 'Conor',
        email: 'Jon@gmail.com',
        password: '12121212',
        age: 22,
        city: 'New York',
    },
];

let errors = '';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

const PORT = 5000;

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/users', (req, res) => {
    res.render('users', {users});
});

app.get('/users/:index', (req, res) => {
    const {index} = req.params;

    const user = users.find(user => user[user] === index);

    if (!user) {
        errors = 'Not user for this index!!!';
        res.redirect('/errorPage');
        return;
    }

    res.render('userInfo', {user});
});

app.get('/errorPage', (req, res) => {
    res.render('errorPage',{errors});
});

app.post('/login', (req, res) => {
    const {email} = req.body;
    const userExist = [...users].filter(user => user.email === email);

    if (!email || userExist.length) {
        errors = 'Email is already exist!!!';
        res.redirect('/errorPage');
        return;
    }

    users.push(req.body);
    res.redirect('/users');
});

app.use((req, res) => {
    res.render('notFoundPage');
});

app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT} port...`);
});