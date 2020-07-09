import React from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Toast extends React.Component{
  render(){
    return(
    <Snackbar open={this.props.open} autoHideDuration={6000} onClose={this.props.handleClose}>
      <Alert onClose={this.props.handleClose} severity={this.props.type}>
        {this.props.message}
      </Alert>
    </Snackbar>
    );
  }
}
