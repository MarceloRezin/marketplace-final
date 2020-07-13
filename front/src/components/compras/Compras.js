import React from 'react';
import Axios from 'axios';
import Toast from '../toast/Toast';
import ComprasList from './ComprasList';
import CompraForm from './CompraForm';
import ConfirmDialog from '../confirm-dialog/ConfirmDialog';
import Select from '../select/Select';
import { Grid, IconButton } from '@material-ui/core';
import { Search, NoteAdd } from '@material-ui/icons';

export default class Compras extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      query: "",
      queryIndexUsuario: -1,
      compras: [],

      compraForm: null,
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

    if(event.target.id === "queryIndexUsuario"){
      this.setState({
        query: event.target.value > -1 ? this.state.usuarios[event.target.value]._id : ""
      });
    }
  }

  handleList = () => {
    Axios.get("http://localhost:3001/compras", {params: {usuario: this.state.query}}).then((resp) => {
      this.setState({
        compras: resp.data
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

  handleSave = (compra) => {
    if(compra.usuario < 0){
      this.showToast("Informe o usuário.", "error");
      return;
    }else{
      compra.usuario = this.state.usuarios[compra.usuario];
    }

    if(compra.anuncio < 0){
      this.showToast("Informe o anúncio.", "error");
      return;
    }else{
      compra.anuncio = this.state.anuncios[compra.anuncio];
    }

    if(compra.id == null){ //Novo
      this.handlePost(compra);
    }else{ //Edição
      this.handlePut(compra);
    }
  }

  handlePost = (compra) => {   
    Axios.post("http://localhost:3001/compras", compra).then((resp) => {

      this.handleList();
      this.closeForm();
      this.showToast("Compra registrada com sucesso.", "success");

    }).catch((err) => {
      this.showToast(err.response.data.error, "error");
    });
  };
  
  handlePut = (compra) => {   
    Axios.put("http://localhost:3001/compras/" + compra.id, compra).then((resp) => {

      this.handleList();
      this.closeForm();
      this.showToast("Compra atualizada com sucesso.", "success");

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
    Axios.delete("http://localhost:3001/compras/" + id).then((resp) => {

      this.handleList();
      this.closeForm();
      this.showToast("Compra removida com sucesso.", "success");

    }).catch((err) => {
      this.showToast(err.response.data.error, "error");
    });
  };

  openForm = (compraForm) => {
    this.setState({
      showForm: true,
      compraForm: compraForm
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
              <Select
                id="queryIndexUsuario"
                label="Buscar por Usuário"
                value={this.state.queryIndexUsuario}
                onChange={this.handleChange}
                itens={this.state.usuarios.map( u => u.nome)}
              />
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
          <ComprasList
            handleEdit={this.openForm}
            handleDelete={this.handleConfirm}
            compras={this.state.compras}
          />
        </Grid>
        <CompraForm
          show={this.state.showForm}
          compra={this.state.compraForm}
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
          textoConteudo="Tem certeza que deseja apagar este anúncio?"
          textoNao="Cancelar"
          textoSim="Excluir"
        />
        <Toast open={this.state.toastOpen} type={this.state.toastTipo} message={this.state.toastMensagem} handleClose={this.closeToast} />
    </Grid>
    );
  }

}
