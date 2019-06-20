import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainContainer from './Containers/MainContainer.jsx'
import Login from './Components/Login.jsx';
import AuthenticatedComponent from './Components/AuthenticatedComponent.jsx';
import {Switch, Route} from 'react-router-dom';


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
        <Switch>
          <Route path='/login' component={Login} />
          <AuthenticatedComponent>
            <Route path='/content' component={MainContainer}/> 
          </AuthenticatedComponent>
        </Switch>
      </div>
    )
  }
}


export default connect(mapStateToProps)(App);