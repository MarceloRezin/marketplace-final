import React from 'react';
import Axios from 'axios';
import Toast from '../toast/Toast';
import UsuariosList from './UsuariosList';
import UsuarioForm from './UsuarioForm';
import ConfirmDialog from '../confirm-dialog/ConfirmDialog';
import { Grid, TextField, IconButton } from '@material-ui/core';
import { Search, NoteAdd } from '@material-ui/icons';

export default class Usuarios extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      query: "",
      usuarios: [],

      usuarioForm: null,
      showForm: false,

      toastTipo: "",
      toastOpen: false,
      toastMensagem: "",

      confirmOpen: false,
      idDelete: null
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
    Axios.get("http://localhost:3001/usuarios", {params: {nome: this.state.query}}).then((resp) => {
      this.setState({
        usuarios: resp.data
      });
    });
  }

  handleSave = (usuario) => {

    if(usuario.id == null){ //Novo
      this.handlePost(usuario);
    }else{ //Edição
      this.handlePut(usuario);
    }
  }

  handlePost = (usuario) => {   
    Axios.post("http://localhost:3001/usuarios", usuario).then((resp) => {

      this.handleList();
      this.closeForm();
      this.showToast("Usuário registrado com sucesso.", "success");

    }).catch((err) => {
      this.showToast(err.response.data.error, "error");
    });
  };
  
  handlePut = (usuario) => {   
    Axios.put("http://localhost:3001/usuarios/" + usuario.id, usuario).then((resp) => {

      this.handleList();
      this.closeForm();
      this.showToast("Usuário atualizado com sucesso.", "success");

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
    Axios.delete("http://localhost:3001/usuarios/" + id).then((resp) => {

      this.handleList();
      this.closeForm();
      this.showToast("Usuário removido com sucesso.", "success");

    }).catch((err) => {
      this.showToast(err.response.data.error, "error");
    });
  };

  openForm = (usuarioForm) => {
    this.setState({
      showForm: true,
      usuarioForm: usuarioForm
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
              <TextField fullWidth id="query" label="Buscar Usuários" variant="outlined" value={this.state.query} onChange={this.handleChange} />
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
          <UsuariosList
            handleEdit={this.openForm}
            handleDelete={this.handleConfirm}
            usuarios={this.state.usuarios} 
          />
        </Grid>
        <UsuarioForm
          show={this.state.showForm}
          usuario={this.state.usuarioForm}
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
          textoConteudo="Tem certeza que deseja apagar este usuário?"
          textoNao="Cancelar"
          textoSim="Excluir"
        />
        <Toast open={this.state.toastOpen} type={this.state.toastTipo} message={this.state.toastMensagem} handleClose={this.closeToast} />
    </Grid>
    );
  }

}
