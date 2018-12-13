let Filter = {
    date: function (dateList) {
        return dateList.reverse();
    },
    amount: function (amountList, order) {
        if (order === 'ASC') {
            return amountList.sort((a, b) => {
                return b.expense_amount - a.expense_amount;
            })
        }
        else {
            return amountList.sort((a, b) => {
                return a.expense_amount - b.expense_amount;
            })
        }
    }
}

export default Filter;