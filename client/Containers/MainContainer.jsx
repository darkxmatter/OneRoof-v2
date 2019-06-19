import React, { Component } from 'react';
import { connect } from 'react-redux';
// import from child components...
import ManagerContainer from './ManagerContainer.jsx';
import TenantContainer from './TenantContainer.jsx';

const mapStateToProps = store => ({
  // add pertinent state here
  username: store.user.username,
  role: store.user.role,
});


const mapDispatchToProps = dispatch => ({

})

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div className="container">
          <div className="outerBox">
            <h1 id="header">{this.props.username}'s {this.props.role} Dashboard</h1>
            { this.props.role === 'Manager' ? <ManagerContainer key="manCon1" /> : <TenantContainer key="tenCon2" /> }
          </div>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);