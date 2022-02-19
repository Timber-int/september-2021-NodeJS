class SignInControllers {
    signInPage(req, res) {
        res.render('signIn');
    };

    renderUserContent(req, res) {
        try {
            const findUser = req.user;

            if (!findUser.length) {
                throw new Error('Wrong email or password!!!');
            }

            res.redirect(`/users/${findUser[0].id}`);

        } catch (e) {
            res.status(404).send(e.message);
        }
    };
}

module.exports = new SignInControllers;