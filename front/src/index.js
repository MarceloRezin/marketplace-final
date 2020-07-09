import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Axios.defaults.headers.common['access-token'] = localStorage.getItem("accessToken");

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/login" exact={true} component={Login} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
