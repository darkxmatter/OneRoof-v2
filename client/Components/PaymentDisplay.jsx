import React, { Component } from 'react';


class PaymentDisplay extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div>
        <ul>
          {this.props.paymentHistory.map((element, index) => {
            return (<li key={index}>
                    Month:{JSON.stringify(element.month)} Amount: $200 Sent: {JSON.stringify(element.sent)} Received: {JSON.stringify(element.received)}
                  </li>)
            })
          }
        </ul>
      </div>
    )
  }
}

export default PaymentDisplay;