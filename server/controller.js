module.exports = {
    registerUser: (req, res, bcrypt, validationResult) => {
        // Validation for body inputs
        req.checkBody('username', 'Username field cannot be empty').notEmpty();
        req.checkBody('username', 'Username must be between 4-15 characters long').len(4, 15);
        req.checkBody('password', 'Password must be between 8 and 16 characters long').len(8, 16);
        req.checkBody('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
        req.checkBody('password', "Passwords don't match").equals(req.body.password2);
        const errors = req.validationErrors();
        // If there are any errors don't add the user to the database
        if (errors) {
            res.send(errors);
        }
        else {
            let { accountType, username, email, password } = req.body;
            bcrypt.hash(password, null, null, (err, hash) => {
                req.app.get('db').register_user([accountType, username, hash, email])
                    .then((user) => {
                        let { id } = user[0];
                        req.session.userid = id;
                        res.sendStatus(200);
                    })
                    .catch(err => res.status(500).send(err));
            })
        }
    },
    findUser: (req, res, bcrypt) => {
        let { username, password } = req.body;
        req.app.get('db').find_user([username])
            .then(user => {
                let { id, password } = user[0];
                req.session.userid = id;
                bcrypt.compare(password, password, (error, response) => {
                    (response ? res.sendStatus(200) : res.sendStatus(401))
                })
            })
            .catch(err => res.status(500).send(err))
    }
}