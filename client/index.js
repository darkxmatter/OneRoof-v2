import React from 'react';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store';
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';


render(
  // wrap the App in the Provider and pass in the store
  <Provider store={store}>
    <BrowserRouter>
    <Switch>
      <Route path='/' component={App} />
      </Switch>
    </BrowserRouter> 
  </Provider>,
  document.getElementById('root')
);