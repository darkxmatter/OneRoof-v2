import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainContainer from './Containers/MainContainer.jsx'
import Login from './Components/Login.jsx';
import { Route, Switch } from 'react-router-dom';


const mapStateToProps = store => ({
  login: store.user.login
});

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    return(
      <div className="App">
        <h1>Welcome to NewtRoof</h1>
        {/* <Switch>
          <Route path="/login" component={Login} />
          <Route path="/content" component={MainContainer} />
        </Switch> */}
        { this.props.login === false ? (
          <Login /> 
        ) : ( 
          <MainContainer />
        )}
      </div>
    )
  }
}


export default connect(mapStateToProps)(App);