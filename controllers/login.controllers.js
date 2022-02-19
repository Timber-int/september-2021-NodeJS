let users = require('../dataBase/users');
const uuid = require('uuid');

class loginControllers {
    loginPage(req, res) {
        res.render('login');
    };

    loginPassed(req, res) {
        users.push({...req.body, id: uuid.v4()});

        res.render('users',{users})
    };
}

module.exports = new loginControllers;