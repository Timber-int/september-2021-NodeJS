let users = require('../dataBase/users');

class LoginMiddlewares {
    isEmailExist(req, res, next) {
        try {
            const {email, password} = req.body;
            const userExist = [...users].filter(user => user.email === email);

            if (!email) {
                throw new Error('Enter your email!!!');
            }

            if (!password) {
                throw new Error('Enter your password!!!');
            }

            if (userExist.length) {
                throw new Error('Email is already exist!!!');
            }

            next();
        } catch (e) {
            res.status(400).send(e.message);
        }
    };
}

module.exports = new LoginMiddlewares;