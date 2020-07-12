import React from 'react';
import Axios from 'axios';
import Toast from '../toast/Toast';
import AnunciosList from './AnunciosList';
import AnuncioForm from './AnuncioForm';
import { Grid, TextField, IconButton } from '@material-ui/core';
import { Search, NoteAdd } from '@material-ui/icons';

export default class Anuncios extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      query: "",
      anuncios: [],

      anuncioForm: null,
      showForm: false,

      categorias: [],
      usuarios: [],

      toastTipo: "",
      toastOpen: false,
      toastMensagem: ""
    };
  }

  componentDidMount = () => {
    this.handleList();
    this.handleListCategorias();
    this.handleListUsuarios();
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
  
  handleListCategorias = () => {
    Axios.get("http://localhost:3001/categorias").then((resp) => {
      this.setState({
        categorias: resp.data
      });
    });
  }
  
  handleListUsuarios = () => {
    Axios.get("http://localhost:3001/usuarios").then((resp) => {
      this.setState({
        usuarios: resp.data
      });
    });
  }

  handleSave = (anuncio) => {
    
    console.log(anuncio.usuario);
    
    if(anuncio.usuario < 0){
      this.showToast("Informe o usuário.", "error");
      return;
    }else{
      anuncio.usuario = this.state.usuarios[anuncio.usuario];
    }

    if(anuncio.categoria < 0){ //Não é obrigatório
      delete anuncio.categoria
    }else{
      anuncio.categoria = this.state.categorias[anuncio.categoria];
    }

    if(anuncio.id == null){ //Novo
      this.handlePost(anuncio);
    }else{ //Edição
      this.handlePut(anuncio);
    }
  }

  handlePost = (anuncio) => {   
    Axios.post("http://localhost:3001/anuncios", anuncio).then((resp) => {

      this.handleList();
      this.closeForm();
      this.showToast("Anúncio registrado com sucesso.", "success");

    }).catch((err) => {
      this.showToast(err.response.data.error, "error");
    });
  };
  
  handlePut = (anuncio) => {   
    Axios.put("http://localhost:3001/anuncios" + anuncio.id, anuncio).then((resp) => {

      this.handleList();
      this.closeForm();
      this.showToast("Anúncio atualizado com sucesso.", "success");

    }).catch((err) => {
      this.showToast(err.response.data.error, "error");
    });
  };

  openForm = (anuncioForm) => {
    this.setState({
      showForm: true,
      anuncioForm: anuncioForm
    });
  }

  closeForm = () => {
    this.setState({
      showForm: false
    });
  };

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
              <IconButton aria-label="Novo anúncio" component="span" onClick={() => this.openForm(null)}>
                <NoteAdd style={{ color: 'black' }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <AnunciosList handleList={this.handleList} anuncios={this.state.anuncios} />
        </Grid>
        <AnuncioForm show={this.state.showForm} anuncio={this.state.anuncioForm} categorias={this.state.categorias.map( c => c.nome)} usuarios={this.state.usuarios.map( c => c.nome)} handleClose={this.closeForm} handleSubmit={this.handleSave} />
        <Toast open={this.state.toastOpen} type={this.state.toastTipo} message={this.state.toastMensagem} handleClose={this.closeToast} />
    </Grid>
    );
  }

}
