import React from 'react';
import { Typography, Grid, Button, TextField } from '@material-ui/core';

export default class LoginForm extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      email: "",
      senha: ""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.handleSubmit({
      email: this.state.email,
      senha: this.state.senha,
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
          <Typography variant="h3">Login</Typography>
        </Grid>
        <Grid item>
          <TextField id="email" type="email" label="E-mail" required variant="outlined" value={this.state.email} onChange={this.handleChange}/>
        </Grid>
        <Grid item>
          <TextField id="senha" type="password" label="Senha" required variant="outlined" value={this.state.senha} onChange={this.handleChange}/>
        </Grid>
        <Grid item>
          <Grid 
            container
            direction="row"
          >
            <Grid item>
              <Button color="primary" variant="outlined" type="submit">Login</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
    );
  }

}
