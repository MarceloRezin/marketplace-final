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

export default class AvaliacoesList extends React.Component{

  render(){
    return(
      <TableContainer component={Paper}>
        <Table aria-label="Listagem de anúncios">
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell align="right">Anúncio</TableCell>
              <TableCell align="right">Usuário</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.props.avaliacoes.map((avaliacao) => (
            <TableRow key={avaliacao._id}>
              <TableCell component="th" scope="row">
                {avaliacao.descricao}
              </TableCell>
              <TableCell align="right">{avaliacao.anuncio.nome}</TableCell>
              <TableCell align="right">{avaliacao.usuario.nome}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="Editar item" component="span" onClick={() => this.props.handleEdit(avaliacao)}>
                  <Edit style={{ color: 'black' }} />
                </IconButton>
                <IconButton aria-label="Deletar item" component="span" onClick={() => this.props.handleDelete(avaliacao._id)}>
                  <Delete style={{ color: 'black' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
        {this.props.avaliacoes.length < 1 && (
          <Typography variant="h6" style={{"padding": 10}}>Não foram encontradas avaliações.</Typography>
        )}
      </TableContainer>
    );
  }

}
