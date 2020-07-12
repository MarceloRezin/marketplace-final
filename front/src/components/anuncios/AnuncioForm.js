import React from 'react';
import { 
  Slide, 
  Dialog, 
  AppBar, 
  Toolbar,
  Grid,
  Typography,
  IconButton, 
  Button,
  TextField
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Select from '../select/Select';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class AnuncioForm extends React.Component{

  constructor(props){
    super(props);

    this.state = this.getResetAnuncio();
  }

  getResetAnuncio = () => {
    return {
      id: null,
      nome: "",
      descricao: "",
      valor: "",
      usuario: -1,
      categoria: -1,
    };
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.show && !prevProps.show){ //Foi aberto
      if(this.props.anuncio == null){
        this.setState(this.getResetAnuncio());
      }else{
        this.setState({
          id: this.props.anuncio._id,
          nome: this.props.anuncio.nome,
          descricao: this.props.anuncio.descricao,
          valor: this.props.anuncio.valor["$numberDecimal"],
          usuario: this.props.usuarios.findIndex(u => u._id === this.props.anuncio.usuario),
          categoria: this.props.anuncio.categoria ? this.props.categorias.findIndex( c => c._id === this.props.anuncio.categoria._id) : -1,
        });
      }
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.handleSubmit({
      id: this.state.id,
      nome: this.state.nome,
      descricao: this.state.descricao,
      valor: this.state.valor,
      usuario: this.state.usuario,
      categoria: this.state.categoria,
    });
  }

  render(){
    return(
      <Dialog
        fullScreen
        open={this.props.show}
        onClose={this.props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar style={{position: "relative"}}>
          <Toolbar>
            <Typography style={{flex: 1}} variant="h6">
              {this.state.id === null ? "Novo" : "Editar"} Anúncio
            </Typography>
            <IconButton edge="end" color="inherit" onClick={this.props.handleClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <form onSubmit={this.handleSubmit}>
          <Grid 
            container 
            direction="column"
            alignItems="center"
            spacing={2}
            style={{"marginTop": 10}}
          >
            <Grid item>
              <Grid 
                container 
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <TextField type="text" id="nome" label="Nome" variant="outlined" value={this.state.nome} onChange={this.handleChange} required />
                </Grid>
                <Grid item>
                  <TextField type="number" id="valor" label="Valor" variant="outlined" value={this.state.valor} onChange={this.handleChange} required />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid 
                container 
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Select id="categoria" label="Categoria" value={this.state.categoria} onChange={this.handleChange} itens={this.props.categorias.map( c => c.nome)} />
                </Grid>
                <Grid item>
                  <Select id="usuario" label="Usuário" value={this.state.usuario} onChange={this.handleChange} itens={this.props.usuarios.map( u => u.nome)} required />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                type="text"
                id="descricao"
                label="Descrição"
                variant="outlined"
                value={this.state.descricao}
                onChange={this.handleChange}
                style={{minWidth: 470}}  
              />
            </Grid>
            <Grid item>
              <Button color="primary" variant="outlined" type="submit">Salvar</Button>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    );
  }
}
