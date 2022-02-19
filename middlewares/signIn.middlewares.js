let users = require('../dataBase/users');

class SignInMiddlewares {
    checkIsEmailAndPasswordExist(req, res, next) {
        try {
            const {email, password} = req.body;

            const findUser = [...users].filter(user => email && password && user.email === email && user.password === password);

            if (!email && !password) {
                throw new Error('Wrong email or password');
            }

            req.user = findUser;

            next();

        } catch (e) {
            res.status(404).send(e.message);
        }
    };

    checkIsPasswordAndEmailValid(req, res, next) {
        try {
            const {email, password} = req.body;

            if (password.length < 4) {
                throw new Error('The password must not be less than 4 characters.');
            }

            if (password.length > 12) {
                throw new Error('The password must not be longer than 12 characters.');
            }

            if (!email.includes('@')) {
                throw new Error('Email or password no valid');
            }

            next();

        } catch (e) {
            res.status(400).send(e.message);
        }
    }
}

module.exports = new SignInMiddlewares;