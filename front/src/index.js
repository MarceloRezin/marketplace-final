import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Cadastro from './components/cadastro/Cadastro';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Axios.defaults.headers.common['access-token'] = localStorage.getItem("accessToken");

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/cadastro" exact={true} component={Cadastro} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
