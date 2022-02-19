let users = require('../dataBase/users');

class UserControllers {
    getAllUsers(req, res) {

        res.render('users', {users});
    };

    getSingleUser(req, res) {
        const user = req.user;

        res.render('userInfo', {user});
    };

    deleteUserById(req, res) {
        const {id} = req.params;

        users = users.filter(user => user.id !== id);
        console.log('++++++++++++++++++++++++++++++')
        console.log(users)
        console.log('++++++++++++++++++++++++++++++')
        res.redirect('/users');
    }
}

module.exports = new UserControllers;