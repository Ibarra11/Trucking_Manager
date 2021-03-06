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
        let { name, dayHired, monthHired, yearHired, unitNumber } = req.body;
        let { userId } = req.session;
        console.log(req.body);
        req.app.get('db').add_driver([userId, name, dayHired, monthHired, yearHired, unitNumber])
            .then(() => res.sendStatus(200))
            .catch(err => console.log(err))
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
        let driverId = req.params.id;
        let { userId } = req.session;
        console.log(req.body);
        console.log(driverId);
        let { name, monthHired, dayHired, yearHired, unitNumber } = req.body;
        req.app.get('db').update_driver([driverId, userId, name, dayHired, monthHired, yearHired, unitNumber])
            .then(() => res.sendStatus(200))
            .catch(err => console.log(err))
    },
    addTruck: (req, res) => {
        let { unit, make, model, year, plate_number, vin } = req.body;
        let { userId } = req.session;
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
        let { unitNumber, make, model, year, plateNumber, vin } = req.body;
        let { userId } = req.session;
        let truckId = req.params.id;
        req.app.get('db').update_truck([userId, truckId, unitNumber, make, model, year, plateNumber, vin])
            .then(() => res.sendStatus(200))
            .catch(err => console.log(err))
    },
    deleteTruck: (req, res) => {
        let { userId } = req.session;
        let { id } = req.params;
        req.app.get('db').delete_truck([userId, id])
            .then(() => res.sendStatus(200))
            .catch(err => console.log(err))
    },
    addPayroll: (req, res) => {
        let { month, day, year, driver, amount } = req.body;
        let { userId } = req.session;
        req.app.get('db').add_payroll([userId, month, day, year, driver, amount])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getPayroll: (req, res) => {
        let { userId } = req.session;
        req.app.get('db').get_payroll([userId])
            .then(payments => res.send(payments))
            .catch(err => res.status(500).send(err))
    },
    getPayrollPerDriver: (req, res) => {
        let { userId } = req.session;
        let { year } = req.query;
        req.app.get('db').get_payroll_per_driver([userId, year])
            .then(driverPayroll => {
                res.send(driverPayroll)
            })
            .catch(err => res.status(500).send(err))
    },
    deletePayroll: (req, res) => {
        let { id } = req.params;
        req.app.get('db').delete_payroll([id])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    updatePayroll: (req, res) => {
        let payrollId = req.params.id;
        let { userId } = req.session;
        let { month, day, year, payrollAmount, driver } = req.body;
        console.log(req.body);
        console.log(req.params.id);
        req.app.get('db').update_payroll([payrollId, userId, month, day, year, payrollAmount, driver])
            .then(() => res.sendStatus(200))
            .catch(err => console.log(err) )
    },
    getPayrollMonthly: (req, res) => {
        let { userId } = req.session;
        let { year } = req.query;
        req.app.get('db').get_payroll_monthly([userId, year])
            .then(payroll => {
                res.send(payroll)
            })
            .catch(err => res.status(500).send(err))
    },
    getTotalPayroll: (req, res) => {
        let { userId } = req.session;
        let { year } = req.query;
        req.app.get('db').get_total_payroll([userId, year])
            .then(amount => res.send(amount))
            .catch(err => res.status(500).send(err))
    },
    getTotalPayments: (req, res) => {
        let { userId } = req.session;
        let { year } = req.query;
        req.app.get('db').get_total_payments([userId, year])
            .then(payments => res.send(payments))
            .catch(err => res.status(500).send(err))
    },
    getPayrollYears: (req, res) => {
        let { userId } = req.session;
        req.app.get('db').get_payroll_years([userId])
            .then(years => res.send(years))
            .catch(err => res.status(500).send(err))
    },
    getExpenseCategories: (req, res) => {
        req.app.get('db').get_expense_categories()
            .then(categories => res.send(categories))
            .catch(err => res.status(500).send(err))
    },
    getExpensesMonthly: (req, res) => {
        let { userId } = req.session;
        let { year } = req.query;
        req.app.get('db').get_expense_monthly([userId, year])
            .then(expenses => res.send(expenses))
            .catch(err => res.status(500).send(err))
    },
    getExpenseYears: (req, res) => {
        let { userId } = req.session;
        req.app.get('db').get_expense_years([userId])
            .then(years => res.send(years))
            .catch(err => res.status(500).send(err))
    },
    addExpense: (req, res) => {
        let { userId } = req.session;
        let { expenseCategory, expenseUnitNumber, expenseAmount, month, day, year } = req.body;
        req.app.get('db').add_expense([userId, expenseCategory, expenseUnitNumber, expenseAmount, month, day, year])
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
        let { year } = req.query;
        req.app.get('db').get_total_expenses([userId, year])
            .then(expenses => res.send(expenses))
            .catch(err => res.status(500).send(err))
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
        let { expense_date, expense_category, unit_number, expense_amount } = req.body;
        req.app.get('db').update_expense([id, expense_date, expense_category, unit_number, expense_amount])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getExpenseSumPerCategory: (req, res) => {
        let { userId } = req.session;
        let { year } = req.query;
        req.app.get('db').get_expense_sum_category([userId, year])
            .then(expenses => res.send(expenses))
            .catch(err => res.status(500).send(err))
    },
    getExpenseSumPerTruck: (req, res) => {
        let { userId } = req.session;
        let { year } = req.query;
        req.app.get('db').get_expense_sum_truck([userId, year])
            .then(expenses => res.send(expenses))
            .catch(err => res.status(500).send(err))
    },
    addCompany: (req, res) => {
        let { company } = req.body;
        let { userId } = req.session;
        req.app.get('db').add_company([userId, company])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getCompanies: (req, res) => {
        let { userId } = req.session;
        req.app.get('db').get_companies([userId])
            .then(companies => res.send(companies))
            .catch(err => res.status(500).send(err))
    },
    addIncome: (req, res) => {
        let { userId } = req.session;
        let { company, check_amount, check_number, month, day, year } = req.body;
        +check_number
        console.log(company)
        req.app.get('db').add_income([userId, company, check_amount, check_number, month, day, year])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getIncome: (req, res) => {
        let { userId } = req.session;
        req.app.get('db').get_income([userId])
            .then(income => res.send(income))
            .catch(err => res.status(500).send(err))
    },
    getIncomeYears: (req, res) => {
        let { userId } = req.session;
        req.app.get('db').get_income_years([userId])
            .then(years => res.send(years))
            .catch(err => res.status(500).send(err))
    },
    getIncomePerMonth: (req, res) => {
        let { userId } = req.session;
        let { year } = req.query;
        req.app.get('db').get_income_per_month([userId, year])
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
        let { check_date, company, amount, check_number } = req.body;
        req.app.get('db').update_income([id, check_date, company, amount, check_number])
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    getIncomePerCompany: (req, res) => {
        let { userId } = req.session;
        let { year } = req.query;
        req.app.get('db').get_income_sum_companies([userId, year])
            .then(companies => res.send(companies))
            .catch(err => res.status(500).send(err))
    },
    getTotalIncome: (req, res) => {
        let { userId } = req.session;
        let { year } = req.query;
        req.app.get('db').get_total_income([userId, year])
            .then(income => res.send(income))
            .catch(err => res.status(500).send(err))
    },
    getRevenueYears: (req, res) => {
        let { userId } = req.session;
        req.app.get('db').get_revenue_years([userId])
            .then(incomeYears => res.send(incomeYears))
            .catch(err => res.status(500).send(err))
    }
}