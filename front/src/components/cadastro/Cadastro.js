import React from 'react';
import Axios from 'axios';
import CadastroForm from './CadastroForm';
import Toast from '../toast/Toast';

export default class Cadastro extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      toastTipo: "",
      toastOpen: false,
      toastMensagem: ""
    };
  }

  handlePost = (usuario) => {   
    Axios.post("http://localhost:3001/usuarios", usuario).then((resp) => {

      this.showToast("Cadastro efetuado com sucesso.", "success");
      setTimeout(() => this.props.history.push("/login"), 2000);

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
      <CadastroForm handleSubmit={this.handlePost}></CadastroForm>
      <Toast open={this.state.toastOpen} type={this.state.toastTipo} message={this.state.toastMensagem} handleClose={this.closeToast} />
    </div>
    );
  }

}
