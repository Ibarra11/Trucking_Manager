import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

let data = {
    datasets: [
        {
            label: 'Truck',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
        }
    ]
};

class Dashboard_Expenses_Truck extends Component {
    constructor(){
        super();
        this.state = {
            resetState : false
        }
    }
    componentDidMount(){
        axios.get('/api/trucks')
        .then(res =>{
            let units = [];
            res.data.forEach(truck =>{
                units.push(truck.unit);
            })
            data.labels = units;
            this.setState({resetState: !this.resetState})
        })
        .catch(err => console.log(err));
        axios.get('/api/expenses/trucks/sum')
        .then(res =>{
            let sumPerTruck = [];
            res.data.forEach(truck =>{
                sumPerTruck.push(truck.sum);
            })
            data.datasets[0].data = sumPerTruck;
            this.setState({resetState: !this.resetState})
        })
    }
    render() {
        return (
            <div>
                <h5>Expenses Per Truck</h5>
                <Bar
                    data={data}
                   
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
}

export default Dashboard_Expenses_Truck;