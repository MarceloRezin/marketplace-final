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

export default class AvaliacaoForm extends React.Component{

  constructor(props){
    super(props);

    this.state = this.getResetAvaliacao();
  }

  getResetAvaliacao = () => {
    return {
      id: null,
      descricao: "",
      usuario: -1,
      anuncio: -1,
    };
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.show && !prevProps.show){ //Foi aberto
      if(this.props.avaliacao == null){
        this.setState(this.getResetAvaliacao());
      }else{
        this.setState({
          id: this.props.avaliacao._id,
          descricao: this.props.avaliacao.descricao,
          usuario: this.props.usuarios.findIndex(u => u._id === this.props.avaliacao.usuario._id),
          anuncio: this.props.anuncios.findIndex( c => c._id === this.props.avaliacao.anuncio._id),
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
      descricao: this.state.descricao,
      usuario: this.state.usuario,
      anuncio: this.state.anuncio,
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
              <TextField
                type="text"
                id="descricao"
                label="Descrição"
                variant="outlined"
                value={this.state.descricao}
                onChange={this.handleChange}
                style={{minWidth: 470}}
                required
              />
            </Grid>
            <Grid item>
              <Grid 
                container 
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Select id="usuario" label="Usuário" value={this.state.usuario} onChange={this.handleChange} itens={this.props.usuarios.map( u => u.nome)} required />
                </Grid>
                <Grid item>
                  <Select id="anuncio" label="Anúncio" value={this.state.anuncio} onChange={this.handleChange} itens={this.props.anuncios.map( a => a.nome)} required />
                </Grid>
              </Grid>
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
