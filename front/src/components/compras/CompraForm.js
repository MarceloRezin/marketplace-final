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

export default class CompraForm extends React.Component{

  constructor(props){
    super(props);

    this.state = this.getResetAnuncio();
  }

  getResetAnuncio = () => {
    return {
      id: null,
      quantidade: 1,
      valorUnitario: "",
      valorFinal: "",
      usuario: -1,
      anuncio: -1,
    };
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.show && !prevProps.show){ //Foi aberto
      if(this.props.compra == null){
        this.setState(this.getResetAnuncio());
      }else{
        this.setState({
          id: this.props.compra._id,
          quantidade: this.props.compra.quantidade,
          valorUnitario: this.props.compra.valorUnitario["$numberDecimal"],
          valorFinal: this.props.compra.valorFinal["$numberDecimal"],
          usuario: this.props.compra.usuario ? this.props.usuarios.findIndex( u => u._id === this.props.compra.usuario._id) : -1,
          anuncio: this.props.compra.anuncio ? this.props.anuncios.findIndex( a => a._id === this.props.compra.anuncio._id) : -1,
        });
      }
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });

    if(event.target.id === "anuncio"){
      if(event.target.value > -1){
        const valor = this.props.anuncios[event.target.value].valor["$numberDecimal"];
        this.setState({
          valorUnitario: valor,
          valorFinal: parseFloat(valor) * this.state.quantidade
        });
      }else{
        this.setState({
          valorUnitario: "",
          valorFinal: ""
        });
      }
    }else if(event.target.id === "quantidade"){
      if(this.state.valorUnitario !== ""){
        this.setState({
          valorFinal: (parseFloat(this.state.valorUnitario) * parseInt(event.target.value)).toFixed(2)
        });
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.handleSubmit({
      id: this.state.id,
      quantidade: this.state.quantidade,
      valorUnitario: this.state.valorUnitario,
      valorFinal: this.state.valorFinal,
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
              <Grid 
                container 
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <Select
                    id="anuncio"
                    label="Anuncio"
                    value={this.state.anuncio}
                    onChange={this.handleChange}
                    itens={this.props.anuncios.map( a => a.nome)}
                    required
                  />
                </Grid>
                <Grid item>
                  <Select
                    id="usuario"
                    label="Usuário"
                    value={this.state.usuario}
                    onChange={this.handleChange}
                    itens={this.props.usuarios.map( u => u.nome)}
                    required
                  />
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
                  <TextField
                    type="number"
                    id="valorUnitario"
                    label="Valor Unitário"
                    variant="outlined"
                    value={this.state.valorUnitario}
                    onChange={this.handleChange}
                    required
                    disabled
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="number"
                    id="quantidade"
                    label="Quantidade"
                    variant="outlined"
                    value={this.state.quantidade}
                    onChange={this.handleChange}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="number"
                    id="valorFinal"
                    label="Valor Final"
                    variant="outlined"
                    value={this.state.valorFinal}
                    onChange={this.handleChange}
                    required
                    disabled
                  />
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
