import React from 'react';

const ManagerPaymentDisplay = (props) => {
    let currentDisplay = [];
    let overdueDisplay = [];
    const paymentsOverdue = props.paymentsOverdue;
    const currentPayments = props.currentPayments;
    currentPayments.forEach(element => {
      currentDisplay.push();
  })

  
    return (
      <div>
        <div>
          Current Month Payments
          <ul>
            {props.currentPayments.map(element => {
              return (
                <li>
                  {'Apt#: '} {JSON.stringify(element.apt_id)} {' Month: '} {props.monthTranslate(element.month)} {' Paid: '} {JSON.stringify(element.sent)} {' Received: '} {JSON.stringify(element.received)}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          Overdue Payments
          <ul>
            {props.paymentsOverdue.map(element => {
              return (
                <li>
                  {'Apt#: '} {JSON.stringify(element.apt_id)} {' Month: '} {props.monthTranslate(element.month)} {' Paid: '} {JSON.stringify(element.sent)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
}

export default ManagerPaymentDisplay;