import React, {Component} from 'react';
import axios from 'axios';
class Dashboard_Add_Category extends Component{
    constructor(){
        super();
        this.state = {
            category: ''
        }
    }

    onInputChange = event => this.setState({category: event.target.value})
    addCategory = event =>{
        event.preventDefault();
        axios.post('/api/expenses/category',{
            category: this.state.category
        })
        .then(() => this.props.history.goBack())
        .catch(err => console.log(err))
    }
    render(){
        return(
            <div className="component-add-category">
                <div className="card">
                    <div className="card-header">
                        <h3>Add Categroy</h3>
                        <button onClick={() => this.props.history.goBack()} className="btn">Back To Expenses</button>
                    </div>
                </div>
                <form onSubmit={this.addCategory}>
                    <div className="form-group">
                        <label>Category</label>
                        <input value={this.state.category} onChange={this.onInputChange} className="form-control" type="text"/>
                    </div>
                    <div className="category-submit">
                        <button type='submit' className="btn">Add Category</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Dashboard_Add_Category;