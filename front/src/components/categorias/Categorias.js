import React from 'react';
import Axios from 'axios';
import Toast from '../toast/Toast';
import CategoriasList from './CategoriasList';
import CategoriaForm from './CategoriaForm';
import ConfirmDialog from '../confirm-dialog/ConfirmDialog';
import { Grid, TextField, IconButton } from '@material-ui/core';
import { Search, NoteAdd } from '@material-ui/icons';

export default class Categorias extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      query: "",
      categorias: [],

      categoriaForm: null,
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
    Axios.get("http://localhost:3001/categorias", {params: {nome: this.state.query}}).then((resp) => {
      this.setState({
        categorias: resp.data
      });
    });
  };

  handleSave = (categoria) => {
    if(categoria.id == null){ //Novo
      this.handlePost(categoria);
    }else{ //Edição
      this.handlePut(categoria);
    }
  }

  handlePost = (categoria) => {   
    Axios.post("http://localhost:3001/categorias", categoria).then((resp) => {

      this.handleList();
      this.closeForm();
      this.showToast("Categoria registrada com sucesso.", "success");

    }).catch((err) => {
      this.showToast(err.response.data.error, "error");
    });
  };
  
  handlePut = (categoria) => {   
    Axios.put("http://localhost:3001/categorias/" + categoria.id, categoria).then((resp) => {

      this.handleList();
      this.closeForm();
      this.showToast("Categoria atualizada com sucesso.", "success");

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
    Axios.delete("http://localhost:3001/categorias/" + id).then((resp) => {

      this.handleList();
      this.closeForm();
      this.showToast("Categoria removida com sucesso.", "success");

    }).catch((err) => {
      this.showToast(err.response.data.error, "error");
    });
  };

  openForm = (categoriaForm) => {
    this.setState({
      showForm: true,
      categoriaForm: categoriaForm
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
              <TextField fullWidth id="query" label="Buscar Categorias" variant="outlined" value={this.state.query} onChange={this.handleChange} />
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
          <CategoriasList handleEdit={this.openForm} handleDelete={this.handleConfirm}  categorias={this.state.categorias} />
        </Grid>
        <CategoriaForm
          show={this.state.showForm}
          categoria={this.state.categoriaForm}
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
          textoConteudo="Tem certeza que deseja apagar esta categoria?"
          textoNao="Cancelar"
          textoSim="Excluir"
        />
        <Toast open={this.state.toastOpen} type={this.state.toastTipo} message={this.state.toastMensagem} handleClose={this.closeToast} />
    </Grid>
    );
  }
}
