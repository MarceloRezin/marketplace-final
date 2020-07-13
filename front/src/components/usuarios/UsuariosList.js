import React from 'react';
import { 
  Paper, 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Typography,
  IconButton
} from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

export default class UsuariosList extends React.Component{

  render(){
    return(
      <TableContainer component={Paper}>
        <Table aria-label="Listagem de usuários">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.props.usuarios.map((usuario) => (
            <TableRow key={usuario._id}>
              <TableCell component="th" scope="row">
                {usuario.nome}
              </TableCell>
              <TableCell align="right">{usuario.email}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="Editar item" component="span" onClick={() => this.props.handleEdit(usuario)}>
                  <Edit style={{ color: 'black' }} />
                </IconButton>
                <IconButton aria-label="Deletar item" component="span" onClick={() => this.props.handleDelete(usuario._id)}>
                  <Delete style={{ color: 'black' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
        {this.props.usuarios.length < 1 && (
          <Typography variant="h6" style={{"padding": 10}}>Não foram encontrados usuários.</Typography>
        )}
      </TableContainer>
    );
  }

}
