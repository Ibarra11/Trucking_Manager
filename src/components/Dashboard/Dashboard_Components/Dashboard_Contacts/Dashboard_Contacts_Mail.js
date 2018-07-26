import React, {Component} from 'react';

class Dashboard_Contacts_Mail extends Component{
    render(){
        return(
            <div className="component-contacts-mail">
                <div className="card card-header">
                    <h3>Send Mail</h3>
                    <button onClick={() => this.props.history.goBack()} className="btn">Go Back</button>
                </div>
            </div>
        )
    }
}

export default Dashboard_Contacts_Mail;