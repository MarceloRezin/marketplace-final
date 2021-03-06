import React from 'react';
import { AppBar, Tabs, Tab, Toolbar, Typography, IconButton } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import ConfirmDialog from '../confirm-dialog/ConfirmDialog';
import Anuncios from '../anuncios/Anuncios';
import Categorias from '../categorias/Categorias';
import Avaliacoes from '../avaliacoes/Avaliacoes';
import Compras from '../compras/Compras';
import Usuarios from '../usuarios/Usuarios';

export default class Marketplace extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      indice: 0,
      confirmOpen: false
    };
  }

  handleChange = (event, newValue) => {
    this.setState({
      indice: newValue
    });
  };

  openConfirm = () => {
    this.setState({
      confirmOpen: true
    });
  };

  closeConfirm = () => {
    this.setState({
      confirmOpen: false
    });
  };

  logout = () => {
    localStorage.setItem("accessToken", "");
    this.props.history.push("/")
  };

  render(){
    return(
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography style={{flex: 1}} variant="h6">
              Marketplace
            </Typography>
            <IconButton edge="end" color="inherit" onClick={this.openConfirm}>
              <ExitToApp />
            </IconButton>
          </Toolbar>
          <Tabs value={this.state.indice} onChange={this.handleChange} aria-label="Abas do marketplace">
            <Tab label="Anúncios" />
            <Tab label="Categorias" />
            <Tab label="Avaliações" />
            <Tab label="Compras" />
            <Tab label="Usuários" />
          </Tabs>
        </AppBar>
        {this.state.indice === 0 && (
          <Anuncios />
        )}
        {this.state.indice === 1 && (
          <Categorias />
        )}
        {this.state.indice === 2 && (
          <Avaliacoes />
        )}
        {this.state.indice === 3 && (
          <Compras />
        )}
        {this.state.indice === 4 && (
          <Usuarios />
        )}
        <ConfirmDialog 
          open={this.state.confirmOpen}
          handleClose={this.closeConfirm}
          handleConfirm={() => {
            this.logout();
            this.closeConfirm();
          }}
          titulo="Confirmção de Logout"
          textoConteudo="Tem certeza que deseja sair?"
          textoNao="Ficar"
          textoSim="Sair"
        />
      </div>
    );
  }

}
