module.exports = {
    registerUser: (req, res, bcrypt) => {
        let { accountType, username, email, password } = req.body;
        bcrypt.hash(password, null, null, (err, hash) => {
            req.app.get('db').register_user([accountType, username, hash, email])
            .then(() =>{ res.sendStatus(200) })
            .catch (err => res.status(500).send(err));
    })
},
    findUser: (req, res, bcrypt) => {
        let { username, password } = req.body;
        req.app.get('db').find_user([username])
            .then(user => {
                bcrypt.compare(password, user[0].password, (error, response) => {
                     (response ? res.sendStatus(200) : res.sendStatus(401))
                })
            })
            .catch(err => res.status(500).send(err))
    }
}