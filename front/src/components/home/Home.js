import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';

export default class Home extends React.Component{

  render(){
    return(
    <Grid 
      container 
      direction="column"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h4">Para continuar realize o login ou crie uma conta</Typography>
      </Grid>
      <Grid item>
        <Grid 
          container
          direction="row"
          spacing={2}
        >
          <Grid item>
            <Button color="primary" variant="outlined" href="/login">Login</Button>
          </Grid>
          <Grid item>
            <Button color="secondary" variant="outlined" href="/cadastro">Criar Conta</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    );
  }

}
