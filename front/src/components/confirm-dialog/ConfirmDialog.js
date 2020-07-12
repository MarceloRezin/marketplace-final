import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

export default class ConfirmDialog extends React.Component{
  render(){
    return(
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <DialogTitle>{this.props.titulo}</DialogTitle>
        <DialogContent>
          <DialogContentText>{this.props.textoConteudo}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            {this.props.textoNao}
          </Button>
          <Button onClick={this.props.handleConfirm} color="primary" autoFocus>
            {this.props.textoSim}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
