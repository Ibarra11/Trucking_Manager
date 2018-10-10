module.exports = {
    registerUser: async (req, res, bcrypt) => {
        // Validation for body inputs
        req.checkBody('username', 'Username field cannot be empty').notEmpty();
        req.checkBody('username', 'Username must be between 4-15 characters long').len(4, 15);
        let user = await req.app.get('db').find_user([req.body.username])
        req.checkBody('username', 'Username already exists').custom(username => {
            return user.length === 0;
        })
        let userEmail = await req.app.get('db').email_exists([req.body.email]);
        req.checkBody('email', 'Email already exist please enter a different one').custom(email => {
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
                        req.session.userId = id;
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
                req.session.userId = id;
                bcrypt.compare(loginPassword, password, (error, response) => {
                    (response ? res.send('valid') : res.send('invalid'))
                })
            })
            .catch(err => res.status(500).send(err))
    },
    addDriver: (req, res) => {
        let { name, contactNumber, address, dateHired, unitNumber } = req.body;
        let { userId } = req.session;
        req.app.get('db').add_driver([userId, name, contactNumber, address, dateHired, unitNumber])
            .then(driver => res.send(driver))
            .catch(err => res.status(500).send(err))
    },
    getAllDrivers: (req, res) => {
        let { userId } = req.session;
        req.app.get('db').get_drivers([userId])
            .then(drivers => res.send(drivers))
            .catch(err => res.status(500).send(err))
    },
    deleteDriver: (req, res) => {
        let { driver_id } = req.params;
        req.app.get('db').delete_driver([driver_id])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    updateDriver: (req, res) => {
        let { id } = req.params;
        let { name, contactNumber, address, dateHired, unitNumber } = req.body;
        req.app.get('db').update_driver([name, contactNumber, address, dateHired, unitNumber, id])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    addContact: (req, res) => {
        let { name, companyName, phone, email, address } = req.body;
        req.app.get('db').add_contact([name, companyName, phone, email, address])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getAllContacts: (req, res) => {
        req.app.get('db').get_all_contacts()
            .then(contacts => res.send(contacts))
            .catch(err => res.status(500).send(err))
    },
    deleteContacts: (req, res) => {
        let { id } = req.params;
        req.app.get('db').delete_contacts([id])
            .then(contacts => res.send(contacts))
            .catch(err => res.status(500).send(err))
    },
    updateContact: (req, res) => {
        let { id } = req.params;
        let { name, company_name, phone, email, address } = req.body;
        req.app.get('db').update_contact([id, name, company_name, phone, email, address])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    addTruck: (req, res) => {
        let { unit, make, model, year, plate_number, vin } = req.body;
        let { userId } = req.session;
        console.log(req.session);
        req.app.get('db').add_truck([userId, unit, make, model, year, plate_number, vin])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getAllTrucks: (req, res) => {
        req.app.get('db').get_trucks([req.session.userId])
            .then(trucks => res.send(trucks))
            .catch(err => res.status(500).send(err))
    },
    updateTruck: (req, res) => {
        let { unit, make, model, year, plate_number, vin } = req.body;
        req.app.get('db').update_truck([unit, make, model, year, plate_number, vin])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    addPayroll: (req, res) => {
        let { date, driver, amount } = req.body;
        let { userId } = req.session;
        req.app.get('db').add_payroll([userId, date, driver, amount])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getPayroll: (req, res) => {
        let { userId } = req.session;
        req.app.get('db').get_payroll([userId])
            .then(payments => res.send(payments))
            .catch(err => console.log(err))
    },
    getPayrollPerDriver: (req, res) => {
        req.app.get('db').get_sum_per_driver()
            .then(sum => res.send(sum))
            .catch(err => res.status(500).send(err))
    },
    deletePayroll: (req, res) => {
        let { id } = req.params;
        req.app.get('db').delete_payroll([id])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    updatePayroll: (req, res) => {
        let { id } = req.params;
        let { date, driver, amount } = req.body;
        req.app.get('db').update_payroll([id, date, driver, amount])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err));
    },
    getPayrollMonthly: (req, res) => {
        req.app.get('db').get_payroll_monthly()
            .then(payroll => res.send(payroll))
            .catch(err => res.status(500).send(err))
    },
    getTotalPayroll: (req, res) => {
        req.app.get('db').get_total_payroll()
            .then(amount => res.send(amount))
            .catch(err => res.status(500).send(err))
    },
    getTotalPayments: (req, res) => {
        req.app.get('db').get_total_payments()
            .then(payments => res.send(payments))
            .catch(err => console.log(err))
    },
    getExpenseCategories: (req, res) => {
        req.app.get('db').get_expense_categories()
            .then(categories => res.send(categories))
            .catch(err => res.status(500).send(err))
    },
    getExpensesMonthly: (req, res) => {
        req.app.get('db').get_expense_monthly()
            .then(expenses => res.send(expenses))
            .catch(err => res.status(500).send(err))
    },
    addExpense: (req, res) => {
        let { userId } = req.session;
        let { date, category, truck, amount } = req.body;
        +truck;
        req.app.get('db').add_expense([userId, date, category, truck, amount])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getAllExpenses: (req, res) => {
        let { userId } = req.session;
        req.app.get('db').get_all_expenses([userId])
            .then(expenses => res.send(expenses))
            .catch(err => res.status(500).send(err))
    },
    getTotalExpenses: (req, res) => {
        let { userId } = req.session;
        req.app.get('db').get_total_expenses([userId])
            .then(expenses => res.send(expenses))
            .catch(err => console.log(err) )
    },
    addCategory: (req, res) => {
        let { category } = req.body;
        console.log(req.body);
        req.app.get('db').add_category([category])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    deleteExpense: (req, res) => {
        let { id } = req.params;
        req.app.get('db').delete_expense([id])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getAverageExpensePerMonth: (req, res) => {
        req.app.get('db').get_avg_expense_month()
            .then(avg => res.send(avg))
            .catch(err => res.status(500).send(err))
    },
    updateExpense: (req, res) => {
        let { id } = req.params;
        let { date, category, truck, amount } = req.body;
        req.app.get('db').update_expense([id, date, category, truck, amount])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getExpenseSumPerCategory: (req, res) => {
        req.app.get('db').get_expense_sum_category()
            .then(expenses => res.send(expenses))
            .catch(err => res.status(500).send(err))
    },
    getExpenseSumPerTruck: (req, res) => {
        req.app.get('db').get_expense_sum_truck()
            .then(expenses => res.send(expenses))
            .catch(err => res.status(500).send(err))
    },
    addCompany: (req, res) => {
        let { company } = req.body;
        req.app.get('db').add_company([company])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getCompanies: (req, res) => {
        req.app.get('db').get_companies()
            .then(companies => res.send(companies))
            .catch(err => this.status(500).send(err))
    },
    addIncome: (req, res) => {
        let { userId } = req.session;
        let { date, company, amount, check } = req.body;
        req.app.get('db').add_income([userId, date, company, amount, +check])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getIncome: (req, res) => {
        let { userId } = req.session;
        req.app.get('db').get_income([userId])
            .then(income => res.send(income))
            .catch(err => res.status(500).send(err))
    },
    getIncomePerMonth: (req, res) => {
        req.app.get('db').get_income_per_month()
            .then(income => res.send(income))
            .catch(err => res.status(500).send(err))
    },
    deleteIncome: (req, res) => {
        let { id } = req.params;
        req.app.get('db').delete_income([id])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getAverageIncomePerMonth: (req, res) => {
        req.app.get('db').get_avg_income_month()
            .then(avg => res.send(avg))
            .catch(err => res.status(500).send(err))
    },
    updateIncome: (req, res) => {
        let { id } = req.params;
        let { date, company, amount, check } = req.body;
        req.app.get('db').update_income([id, date, company, amount, check])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getIncomePerCompany: (req, res) => {
        req.app.get('db').get_income_sum_companies()
            .then(companies => res.send(companies))
            .catch(err => res.status(500).send(err))
    },
    getTotalIncome: (req, res) => {
        let {userId} = req.session;
        req.app.get('db').get_total_income([userId])
            .then(income => res.send(income))
            .catch(err => console.log(err) )
    }
}