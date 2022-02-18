const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');
const uuid = require('uuid');

let users = [];

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

app.get('/signIn', (req, res) => {
    res.render('signIn');
});

app.get('/delete/:id', (req, res) => {
    const {id} = req.params;

    users = users.filter(user => user.id !== id);

    res.redirect('/users');
});

app.get('/users', (req, res) => {

    const {age, city} = req.query;

    let filterUsers;

    if (age) {
        filterUsers = [...users].filter(user => user.age === age);
    } else if (city) {
        filterUsers = [...users].filter(user => user.city.trim().toLowerCase() === city.trim().toLowerCase());
    } else {
        filterUsers = [...users].filter(user => user.age === age && user.city.trim().toLowerCase() === city.trim().toLowerCase());
    }

    if (filterUsers.length) {
        res.render('users', {users: filterUsers});
        return;
    }

    res.render('users', {users});
});

app.get('/users/:index', (req, res) => {
    const {index} = req.params;

    const user = users.find(user => user.id === index);

    if (!user) {
        errors = 'Not user for this index!!!';
        res.redirect('/errorPage');
        return;
    }

    res.render('userInfo', {user});
});

app.get('/errorPage', (req, res) => {
    res.render('errorPage', {errors});
});

app.post('/login', (req, res) => {
    const {email} = req.body;
    const userExist = [...users].filter(user => user.email === email);

    if (!email || userExist.length) {
        errors = 'Email is already exist!!!';
        res.redirect('/errorPage');
        return;
    }

    users.push({...req.body, id: uuid.v4()});

    res.redirect('/users');
});

app.post('/registration', (req, res) => {

    const {email, password} = req.body;

    const findUser = [...users].filter(user=> email && password && user.email === email && user.password === password);

    if (findUser.length) {
        res.redirect(`/users/${findUser[0].id}`);
        return;
    }

    errors = 'Wrong email or password!!!';
    res.redirect('/errorPage');
});

app.use((req, res) => {
    res.render('notFoundPage');
});

app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT} port...`);
});