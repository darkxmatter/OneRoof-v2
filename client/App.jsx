import React, { Component } from 'react';
import MainContainer from './Containers/MainContainer.jsx'
import Login from './Components/login.jsx';
//import * as userActions from '../Actions/userActions.js';
//import * as manActions from '../Actions/manActions.js';
import { bindActionCreators } from 'redux';

const mapStateToProps = ({ store }) => ({
  // add pertinent state here
  username: store.user.username,
  password: store.user.password,
  role: store.user.role,
  login: store.user
});


const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...userActions, manActions, tenantActions }, dispatch)
  };
};

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let Display = [];
    const logComponent = <Login key="mainCon1" signIn={this.props.signIn} username={this.props.username} password={this.props.password} 
    updateUsername={this.props.updateUsername} updatePassword={this.props.updatePassword} signup={this.props.signup}/>;

    const MainContainer = <MainContainer key="mainCon2" useId={this.props.userId}/>
    const header1 = <h1>Welcome to 1Roof</h1>

    if(this.props.login){
      Display.push(MainContainer);
    } else Display.push(header1, logComponent);

    return(
      <div className="App">
        {Display}
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);