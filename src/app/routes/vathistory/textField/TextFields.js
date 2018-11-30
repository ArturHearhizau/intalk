import React from 'react';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import IconSend from 'material-ui-icons/Send';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';

class TextFields extends React.Component {
    state = {
        country: '',
        number: ''
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        console.log(this.props);
        let { addVat } = this.props;
        const { country, number} = this.state;
        return (
            <form className="row" noValidate autoComplete="off">
                <div className="col-md-3 col-12">
                    <TextField
                        required
                        onChange={this.handleChange('country')}
                        id="name"
                        label="State"
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div className="col-md-3 col-12">
                    <TextField
                        required
                        onChange={this.handleChange('number')}
                        id="required"
                        label="VAT Number"
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div className="col-md-3 col-12">
                    <Button
                      onClick={() => addVat(country, number)}
                      variant="raised"
                      color="primary">
                      Save
                      <IconSend />
                    </Button>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    addVat(country, number) {
      dispatch({ type: 'ADD_VAT', country, number });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextFields);