import React from 'react';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    fetch('/logout')
    // .then(res=>res.json())
    // .then(res =>console.log(res));
  }

  render() {
    return (
      <button onClick={this.logout}>Logout</button>
    );
  }
}

export default Logout;