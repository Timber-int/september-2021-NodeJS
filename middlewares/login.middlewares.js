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

    checkIsUserBodyValid(req, res, next) {
        try {
            const {firstName, lastName, age, city} = req.body;

            if (!firstName) {
                throw new Error('First name is required!!!');
            }
            if (!lastName) {
                throw new Error('Last name is required!!!');
            }

            if (age < 0 || age > 160) {
                throw new Error('Wrong age is not valid!!!');
            }

            if (!age) {
                throw new Error('Age is required!!!');
            }
            if (!city) {
                throw new Error('City is required!!!');
            }

            next();
        } catch (e) {
            res.status(400).send(e.message);
        }
    };
}

module.exports = new LoginMiddlewares;