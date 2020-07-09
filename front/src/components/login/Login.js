import React from 'react';
import Axios from 'axios';
import LoginForm from './LoginForm';
import Toast from '../toast/Toast';

export default class Computador extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      toastTipo: "",
      toastOpen: false,
      toastMensagem: "",
    };
  }

  handlePost = (login) => {    
    Axios.post("http://localhost:3001/usuarios/logar", login).then((resp) => {
      console.log(resp);
    }).catch((err) => {
      this.showToast(err.response.data.error, "error");
    });
  }

  showToast = (mensagem, tipo) => {
    this.setState({
      toastTipo: tipo,
      toastOpen: true,
      toastMensagem: mensagem,
    });
  };

  closeToast = (event, reason) => {

    if (reason === 'clickaway') {
      return;
    }
    
    this.setState({
      toastOpen: false
    });
  };

  render(){
    return(
    <div>
      <LoginForm handleSubmit={this.handlePost}></LoginForm>
      <Toast open={this.state.toastOpen} type={this.state.toastTipo} message={this.state.toastMensagem} handleClose={this.closeToast} />
    </div>
    );
  }

}
