import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Cost/Month',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

class Dashboard_Expenses_Monthly extends Component {

    constructor() {
        super();
        this.state = {
            changeState: false
        }
    }


    componentDidUpdate(prevProps) {
        if(this.props.year !== prevProps.year){
            this.getExpensesMonthly();
        }
    }

    getExpensesMonthly = () => {
        axios.get('/api/expenses/monthly?year=' + this.props.year)
            .then(res => {
                let months = [];
                let expensePerMonth = [];
                for(let i = 0; i < res.data.length; i++){
                    months.push(res.data[i].month);
                }
                for(let i = 1; i <= 12; i++){
                    if(!months.includes(i)){
                        expensePerMonth.push(0)
                    }
                    else{
                        let monthSum = res.data.pop().sum
                        expensePerMonth.push(monthSum);
                    }
                }
                data.datasets[0].data = expensePerMonth;
                this.setState({ changeState: !this.state.changeState })

            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="component-expense-total">
                <Line
                    height={200}
                    options={{
                        maintainAspectRatio: false
                    }}
                    data={data} />

            </div>
        )
    }
}

export default Dashboard_Expenses_Monthly;