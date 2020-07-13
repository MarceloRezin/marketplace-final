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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class UsuarioForm extends React.Component{

  constructor(props){
    super(props);

    this.state = this.getResetUsuario();
  }

  getResetUsuario = () => {
    return {
      id: null,
      nome: "",
      email: "",
      senha: "",
      endereco: ""
    };
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.show && !prevProps.show){ //Foi aberto
      if(this.props.usuario == null){
        this.setState(this.getResetUsuario());
      }else{
        this.setState({
          id: this.props.usuario._id,
          nome: this.props.usuario.nome,
          email: this.props.usuario.email,
          senha: this.props.usuario.senha,
          endereco: this.props.usuario.endereco
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
      email: this.state.email,
      senha: this.state.senha,
      endereco: this.state.endereco
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
                  <TextField type="text" id="senha" label="Senha" variant="outlined" value={this.state.senha} onChange={this.handleChange} required />
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
                  <TextField type="email" id="email" label="E-mail" variant="outlined" value={this.state.email} onChange={this.handleChange} required />
                </Grid>
                <Grid item>
                  <TextField type="text" id="endereco" label="Endereço" variant="outlined" value={this.state.endereco} onChange={this.handleChange} />
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
