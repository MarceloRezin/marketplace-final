import React from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';

export default class MeuSelect extends React.Component{
  render(){
    return(
      <FormControl required={this.props.required}>
        <InputLabel htmlFor={this.props.id}>{this.props.label}</InputLabel>
        <Select
          native
          variant="outlined"
          style={{minWidth: 220}}
          value={this.props.value}
          onChange={this.props.onChange}
          inputProps={{
            name: 'age',
            id: this.props.id,
          }}
        >
          <option value={-1}>Nenhum (a)</option>
          {this.props.itens.map((i, index) => {
            return (
            <option key={index} value={index}>{i}</option>
            )
          })}
        </Select>
      </FormControl>
    );
  }
}
