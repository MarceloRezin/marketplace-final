import React from 'react';
import { Typography, Grid, Button, TextField } from '@material-ui/core';

export default class CadastroForm extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      nome: "",
      email: "",
      senha: "",
      endereco: ""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.handleSubmit({
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha,
      endereco: this.state.endereco
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render(){
    return(
    <form onSubmit={this.handleSubmit}>
      <Grid 
        container 
        direction="column"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h2">Informe os dados para realizar o cadastro:</Typography>
        </Grid>
        <Grid item>
          <TextField id="nome" label="Nome" required variant="outlined" value={this.state.nome} onChange={this.handleChange}/>
        </Grid>
        <Grid item>
          <TextField id="email" type="email" label="E-mail" required variant="outlined" value={this.state.email} onChange={this.handleChange}/>
        </Grid>
        <Grid item>
          <TextField id="senha" type="password" label="Senha" required variant="outlined" value={this.state.senha} onChange={this.handleChange}/>
        </Grid>
        <Grid item>
          <TextField id="endereco" label="Endereço" variant="outlined" value={this.state.endereco} onChange={this.handleChange}/>
        </Grid>
        <Grid item>
          <Grid 
            container
            direction="row"
          >
            <Grid item>
              <Button color="primary" variant="outlined" type="submit">Cadastrar</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
    );
  }

}
