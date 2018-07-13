module.exports = {
    registerUser: async (req, res, bcrypt, validationResult) => {
        // Validation for body inputs
        req.checkBody('username', 'Username field cannot be empty').notEmpty();
        req.checkBody('username', 'Username must be between 4-15 characters long').len(4, 15);
        let user = await req.app.get('db').find_user([req.body.username])
        req.checkBody('username', 'Username already exists').custom( username => {
            return user.length === 0;
        })
        let userEmail = await req.app.get('db').email_exists([req.body.email]);
        req.checkBody('email', 'Email already exist please enter a different one').custom(email =>{
            return userEmail.length === 0;
        })
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
        let { username, password: loginPassword } = req.body;
        req.app.get('db').find_user([username])
            .then(user => {
                let { id, password } = user[0];
                req.session.userid = id;
                bcrypt.compare(loginPassword, password, (error, response) => {
                    (response ? res.send('valid') : res.send('invalid'))
                })
            })
            .catch(err => res.status(500).send(err))
    },
    addDriver: (req, res) =>{
        let {name, contactNumber, address, dateHired, unitNumber} = req.body;
        req.app.get('db').add_driver([name, contactNumber, address, dateHired, unitNumber])
        .then(driver => res.send(driver))
        .catch(err => res.status(500).send(err))
    },
    getAllDrivers: (req, res) =>{
        req.app.get('db').get_drivers()
        .then(drivers => res.send(drivers))
        .catch(err => res.status(500).send(err))
    },
    deleteDriver: (req, res) =>{
        let {driver_id} = req.params;
        req.app.get('db').delete_driver([driver_id])
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    }
}