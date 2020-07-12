import React from 'react';
import Axios from 'axios';
import Toast from '../toast/Toast';
import AvaliacoesList from './AvaliacoesList';
import AvaliacaoForm from './AvaliacaoForm';
import ConfirmDialog from '../confirm-dialog/ConfirmDialog';
import { Grid, TextField, IconButton } from '@material-ui/core';
import { Search, NoteAdd } from '@material-ui/icons';

export default class Avaliacoes extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      query: "",
      avaliacoes: [],

      avaliacaoForm: null,
      showForm: false,

      anuncios: [],
      usuarios: [],

      toastTipo: "",
      toastOpen: false,
      toastMensagem: "",

      confirmOpen: false,
      idDelete: null
    };
  }

  componentDidMount = () => {
    this.handleList();
    this.handleListAnuncios();
    this.handleListUsuarios();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleList = () => {
    Axios.get("http://localhost:3001/avaliacoes", {params: {descricao: this.state.query}}).then((resp) => {
    this.setState({
        avaliacoes: resp.data
      });
    });
  }
  
  handleListAnuncios = () => {
    Axios.get("http://localhost:3001/anuncios").then((resp) => {
      this.setState({
        anuncios: resp.data
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

  handleSave = (avaliacao) => {
    if(avaliacao.usuario < 0){
      this.showToast("Informe o usuário.", "error");
      return;
    }else{
      avaliacao.usuario = this.state.usuarios[avaliacao.usuario];
    }

    if(avaliacao.anuncio < 0){
      this.showToast("Informe o anúncio.", "error");
      return;
    }else{
      avaliacao.anuncio = this.state.anuncios[avaliacao.anuncio];
    }

    if(avaliacao.id == null){ //Novo
      this.handlePost(avaliacao);
    }else{ //Edição
      this.handlePut(avaliacao);
    }
  }

  handlePost = (avaliacao) => {   
    Axios.post("http://localhost:3001/avaliacoes", avaliacao).then((resp) => {

      this.handleList();
      this.closeForm();
      this.showToast("Avaliação registrada com sucesso.", "success");

    }).catch((err) => {
      this.showToast(err.response.data.error, "error");
    });
  };
  
  handlePut = (avaliacao) => {   
    Axios.put("http://localhost:3001/avaliacoes/" + avaliacao.id, avaliacao).then((resp) => {

      this.handleList();
      this.closeForm();
      this.showToast("Avaliação atualizada com sucesso.", "success");

    }).catch((err) => {
      this.showToast(err.response.data.error, "error");
    });
  };

  handleConfirm = (id) => {
    this.setState({
      idDelete: id
    });

    this.openConfirm();
  };

  handleDelete = (id) => {   
    Axios.delete("http://localhost:3001/avaliacoes/" + id).then((resp) => {

      this.handleList();
      this.closeForm();
      this.showToast("Avaliação removida com sucesso.", "success");

    }).catch((err) => {
      this.showToast(err.response.data.error, "error");
    });
  };

  openForm = (avaliacaoForm) => {
    this.setState({
      showForm: true,
      avaliacaoForm: avaliacaoForm
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

  openConfirm = () => {
    this.setState({
      confirmOpen: true
    });
  };
  
  closeConfirm = () => {
    this.setState({
      confirmOpen: false,
      idDelete: null
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
              <TextField fullWidth id="query" label="Buscar Avaliações" variant="outlined" value={this.state.query} onChange={this.handleChange} />
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
          <AvaliacoesList
            handleEdit={this.openForm}
            handleDelete={this.handleConfirm}
            avaliacoes={this.state.avaliacoes}
          />
        </Grid>
        <AvaliacaoForm
          show={this.state.showForm}
          avaliacao={this.state.avaliacaoForm}
          anuncios={this.state.anuncios}
          usuarios={this.state.usuarios}
          handleClose={this.closeForm}
          handleSubmit={this.handleSave}
        />
        <ConfirmDialog 
          open={this.state.confirmOpen}
          handleClose={this.closeConfirm}
          handleConfirm={() => {
            this.handleDelete(this.state.idDelete);
            this.closeConfirm();
          }}
          titulo="Confirmção de Exclusão"
          textoConteudo="Tem certeza que deseja apagar esta avaliação?"
          textoNao="Cancelar"
          textoSim="Excluir"
        />
        <Toast open={this.state.toastOpen} type={this.state.toastTipo} message={this.state.toastMensagem} handleClose={this.closeToast} />
    </Grid>
    );
  }

}
