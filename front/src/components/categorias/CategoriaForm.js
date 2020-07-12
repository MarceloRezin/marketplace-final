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

export default class CategoriaForm extends React.Component{

  constructor(props){
    super(props);

    this.state = this.getResetCategoria();
  }

  getResetCategoria = () => {
    return {
      id: null,
      nome: "",
      descricao: ""
    };
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.show && !prevProps.show){ //Foi aberto
      if(this.props.categoria == null){
        this.setState(this.getResetCategoria());
      }else{
        this.setState({
          id: this.props.categoria._id,
          nome: this.props.categoria.nome,
          descricao: this.props.categoria.descricao || "",
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
      descricao: this.state.descricao
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
              {this.state.id === null ? "Nova" : "Editar"} Categoria
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
              <TextField type="text" id="nome" label="Nome" variant="outlined" value={this.state.nome} onChange={this.handleChange} required />
            </Grid>
            <Grid item>
              <TextField
                type="text"
                id="descricao"
                label="Descrição"
                variant="outlined"
                value={this.state.descricao}
                onChange={this.handleChange}
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
