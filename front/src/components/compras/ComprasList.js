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

export default class ComprasList extends React.Component{

  render(){
    return(
      <TableContainer component={Paper}>
        <Table aria-label="Listagem de compras">
          <TableHead>
            <TableRow>
              <TableCell>Usuário</TableCell>
              <TableCell align="right">Anúncio</TableCell>
              <TableCell align="right">Valor (R$)</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.props.compras.map((compra) => (
            <TableRow key={compra._id}>
              <TableCell component="th" scope="row">
                {compra.usuario ? compra.usuario.nome : "Usuário Removido"}
              </TableCell>
              <TableCell align="right">{compra.anuncio ? compra.anuncio.nome : "Anúncio Removido"}</TableCell>
              <TableCell align="right">{compra.valorFinal["$numberDecimal"]}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="Editar item" component="span" onClick={() => this.props.handleEdit(compra)}>
                  <Edit style={{ color: 'black' }} />
                </IconButton>
                <IconButton aria-label="Deletar item" component="span" onClick={() => this.props.handleDelete(compra._id)}>
                  <Delete style={{ color: 'black' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
        {this.props.compras.length < 1 && (
          <Typography variant="h6" style={{"padding": 10}}>Não foram encontradas compras.</Typography>
        )}
      </TableContainer>
    );
  }

}
