const users = require('../dataBase/users');

class UsersMiddlewares {
    checkIsQueryParams(req, res, next) {
        try {
            const {city, age} = req.query;
            let newUsersArray = [];

            if (age && city) {
                newUsersArray = [...users].filter(user => user.city.trim().toLowerCase() === city.trim().toLowerCase() && user.age === age);
            } else if (city) {
                newUsersArray = [...users].filter(user => user.city.trim().toLowerCase() === city.trim().toLowerCase());
            } else if (age) {
                newUsersArray = [...users].filter(user => user.age === age);
            }

            if (newUsersArray.length) {
                res.render('users', {users: newUsersArray});
                return;
            }

            next();

        } catch (e) {
            res.status(400).send(e.message);
        }
    };

    checkIsUserExist(req, res, next) {
        try {
            const {id} = req.params;
            const user = [...users].find(user => user.id === id);

            if (!user) {
                throw new Error('Not user for this id!!!');
            }

            req.user = user;

            next();

        } catch (e) {
            res.status(404).send(e.message);
        }
    };
}

module.exports = new UsersMiddlewares;