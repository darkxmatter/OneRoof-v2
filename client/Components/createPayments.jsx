import React from 'react';

const CreatePayments = (props) => {
  return (
      <button onClick={props.createPay}>Schedule Next Payment</button>
  );
}

export default CreatePayments;