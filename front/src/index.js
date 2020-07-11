import React from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Cadastro from './components/cadastro/Cadastro';
import Marketplace from './components/marketplace/Marketplace';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

Axios.interceptors.request.use((config) => {
  config.headers.common['x-access-token'] = localStorage.getItem("accessToken");
  return config;
});

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/cadastro" exact={true} component={Cadastro} />
      <Route path="/marketplace" exact={true} component={Marketplace} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
