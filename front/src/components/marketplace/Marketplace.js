import React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import Anuncios from '../anuncios/Anuncios';
import Categorias from '../categorias/Categorias';

export default class Marketplace extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      indice: 0
    };
  }

  handleChange = (event, newValue) => {
    this.setState({
      indice: newValue
    });
  };

  render(){
    return(
      <div>
        <AppBar position="static">
          <Tabs value={this.state.indice} onChange={this.handleChange} aria-label="Abas do marketplace">
            <Tab label="Anúncios" />
            <Tab label="Categorias" />
          </Tabs>
        </AppBar>
        {this.state.indice === 0 && (
          <Anuncios />
        )}
        {this.state.indice === 1 && (
          <Categorias />
        )}
      </div>
    );
  }

}
