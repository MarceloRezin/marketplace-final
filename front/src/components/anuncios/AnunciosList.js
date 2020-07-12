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

export default class AnunciosList extends React.Component{

  render(){
    return(
      <TableContainer component={Paper}>
        <Table aria-label="Listagem de anúncios">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Descrição</TableCell>
              <TableCell align="right">Valor (R$)</TableCell>
              <TableCell align="right">Categoria</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.props.anuncios.map((anuncio) => (
            <TableRow key={anuncio._id}>
              <TableCell component="th" scope="row">
                {anuncio.nome}
              </TableCell>
              <TableCell align="right">{anuncio.descricao}</TableCell>
              <TableCell align="right">{anuncio.valor["$numberDecimal"]}</TableCell>
              <TableCell align="right">{anuncio.categoria ? anuncio.categoria.nome  : ""}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="Editar item" component="span">
                  <Edit style={{ color: 'black' }} />
                </IconButton>
                <IconButton aria-label="Deletar item" component="span">
                  <Delete style={{ color: 'black' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
        {this.props.anuncios.length < 1 && (
          <Typography variant="h6" style={{"padding": 10}}>Não foram encontrados anúncios.</Typography>
        )}
      </TableContainer>
    );
  }

}
