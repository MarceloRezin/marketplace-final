import React from 'react';
import Axios from 'axios';
import Toast from '../toast/Toast';
import AnunciosList from './AnunciosList';
import { Grid, TextField, IconButton } from '@material-ui/core';
import { Search, NoteAdd } from '@material-ui/icons';

export default class Anuncios extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      query: "",
      anuncios: [],

      toastTipo: "",
      toastOpen: false,
      toastMensagem: ""
    };
  }

  componentDidMount = () => {
    this.handleList();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleList = () => {
    Axios.get("http://localhost:3001/anuncios", {params: {nome: this.state.query}}).then((resp) => {
      console.log(resp.data);
      this.setState({
        anuncios: resp.data
      });
    });
  }

  handlePost = (usuario) => {   
    Axios.post("http://localhost:3001/usuarios", usuario).then((resp) => {

      this.showToast("Cadastro efetuado com sucesso.", "success");
      setTimeout(() => this.props.history.push("/login"), 2000);

    }).catch((err) => {
      this.showToast(err.response.data.error, "error");
    });
  }

  showToast = (mensagem, tipo) => {
    this.setState({
      toastTipo: tipo,
      toastOpen: true,
      toastMensagem: mensagem,
    });
  };

  closeToast = (event, reason) => {

    if (reason === 'clickaway') {
      return;
    }
    
    this.setState({
      toastOpen: false
    });
  };

  render(){
    return(
      <Grid 
        container 
        direction="column"
        alignItems="stretch"
        justify="flex-start"
        spacing={2}
        style={{'marginTop': 10}}
      >
        <Grid item>
          <Grid 
            container
            spacing={2}
          >
            <Grid item xs>
              <TextField fullWidth id="query" label="Buscar Anúncios" variant="outlined" value={this.state.query} onChange={this.handleChange} />
            </Grid>
            <Grid item>
              <IconButton aria-label="Buscar" component="span" onClick={this.handleList}>
                <Search style={{ color: 'black' }} />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="Novo anúncio" component="span">
                <NoteAdd style={{ color: 'black' }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <AnunciosList handleList={this.handleList} anuncios={this.state.anuncios} />
        </Grid>
        <Toast open={this.state.toastOpen} type={this.state.toastTipo} message={this.state.toastMensagem} handleClose={this.closeToast} />
    </Grid>
    );
  }

}
