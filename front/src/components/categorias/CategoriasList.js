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

export default class CategoriasList extends React.Component{

  render(){
    return(
      <TableContainer component={Paper}>
        <Table aria-label="Listagem de anúncios">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Descrição</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.props.categorias.map((categoria) => (
            <TableRow key={categoria._id}>
              <TableCell component="th" scope="row">
                {categoria.nome}
              </TableCell>
              <TableCell align="right">{categoria.descricao}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="Editar item" component="span" onClick={() => this.props.handleEdit(categoria)}>
                  <Edit style={{ color: 'black' }} />
                </IconButton>
                <IconButton aria-label="Deletar item" component="span" onClick={() => this.props.handleDelete(categoria._id)}>
                  <Delete style={{ color: 'black' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
        {this.props.categorias.length < 1 && (
          <Typography variant="h6" style={{"padding": 10}}>Não foram encontradas categorias.</Typography>
        )}
      </TableContainer>
    );
  }

}
