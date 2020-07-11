import React from 'react';
import Axios from 'axios';
import Toast from '../toast/Toast';
import AnunciosList from './AnunciosList';

export default class Anuncios extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      anuncios: [],

      toastTipo: "",
      toastOpen: false,
      toastMensagem: ""
    };
  }

  componentDidMount = () => {
    this.handleList();
  }

  handleList = () => {
    Axios.get("http://localhost:3001/anuncios").then((resp) => {
      console.log(resp.data);
      this.setState({
        anuncios: resp.data
      });
    });
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
      <AnunciosList handleList={this.handleList} anuncios={this.state.anuncios} />
      <Toast open={this.state.toastOpen} type={this.state.toastTipo} message={this.state.toastMensagem} handleClose={this.closeToast} />
    </div>
    );
  }

}
