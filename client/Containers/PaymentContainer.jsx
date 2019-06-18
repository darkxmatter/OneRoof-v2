import React, {Component} from 'react';
import TenantPayments from '../Components/TenantPayments.jsx';
import ManagerPayments from '../Components/ManagerPayments.jsx';


class PaymentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthKey: {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11
      }
    }
    this.monthTranslate = this.monthTranslate.bind(this)
  }

  monthTranslate (num) {
    for(let month in this.state.monthKey) {
      if(this.state.monthKey[month] === num) {
        return month;
      }
    }
  }
  
  render() {
    const manPayments = <ManagerPayments aptList={this.props.aptList} monthKey={this.state.monthKey} monthTranslate={this.monthTranslate}/>;
    const tenantPayments = <TenantPayments aptId={this.props.aptId} userId={this.props.userId} monthTranslate={this.monthTranslate} monthKey={this.state.monthKey}/>
    return (
      <div id='paymentDiv'>
        {this.props.role === 'Manager' ? manPayments : tenantPayments}
      </div>
    );
  }
}

export default PaymentContainer;
