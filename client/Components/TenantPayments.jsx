import React, { Component } from 'react';
import PaymentDisplay from './PaymentDisplay.jsx';
import MakePayment from './MakePayment.jsx';



class TenantPayments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paymentHistory: []
    }
    this.updatePaymentDisplay = this.updatePaymentDisplay.bind(this);
  }

  componentDidMount() {
    this.updatePaymentDisplay();
  }

  
  updatePaymentDisplay(){
    fetch('/payments/history', {
    method: 'GET',
    headers: { apt_id: this.props.aptId }
    })
    .then(res => {
      return res.json();
    })
    .then(data =>{
        return this.setState({paymentHistory: data})
    });
  }
  
  
  render() {
    const paymentDisplay = <PaymentDisplay paymentHistory = {this.state.paymentHistory}/>
    const makePayment = <MakePayment aptId = {this.props.aptId} updatePaymentDisplay={this.updatePaymentDisplay}/>
    return (
      <div>
        {paymentDisplay}
        {makePayment}
      </div>
    )
  }
}

export default TenantPayments;
