import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';

export default class Edit extends Component {
  handleChange = value => event => {
    this.setState({
      [value]: event.target.value
    })
  }

  handleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  }

  render() {
    const { initValue, isEdit, value }  = this.props;
    return (
      <div style={{display: 'inline-block'}}>
        {!isEdit ?
          <Typography>{initValue}</Typography>
          :
          <Input
            inputRef={el => this.editInput = el}
            value={value}
            onChange={this.props.handleChange}
            // id="formatted-text-mask-input"
          />
        }
      </div>
    );
  }

  componentDidUpdate() {
    if(this.props.isEdit) {
      let length = this.editInput.value.length === 0 ? 1 : this.editInput.value.length;
      this.editInput.size = length;
    }
  }

}
