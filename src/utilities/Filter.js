let Filter = {
    date: function (dateList) {
        return dateList.reverse();
    },
    amount: function (amountList, order, orderProperty) {
        if (order === 'ASC') {
            return amountList.sort((a, b) => {
                return b[orderProperty] - a[orderProperty];
            })
        }
        else {
            return amountList.sort((a, b) => {
                return a[orderProperty] - b[orderProperty];
            })
        }
    }
}

export default Filter;