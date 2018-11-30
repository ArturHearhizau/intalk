import React from 'react';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import IconSend from 'material-ui-icons/Send';
import {withStyles} from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import HelpOutline from 'material-ui-icons/HelpOutline';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import { connect } from 'react-redux';

const styles = theme => ({
  inputCustom: {
    '& > div > input': {
      padding: '0'
    },
    '& > div > input::-webkit-input-placeholder': {
      fontSize: '16px'
    },
    '& > div:hover:before': {
      backgroundColor:'rgba(66, 66, 66, 0.56)!important'
    }
  },
  alignButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  help: {
    fontSize: '14px'
  }
});

function ExampleInput() {
  return (
    <div style={{width: '110px'}}>
      <div>
        Example of input:
      </div>
      <div>
        GB3124141314
        GB3124143223
        GB5232141441
      </div>
    </div>
  )
}

class TextFields extends React.Component {
    state = {
        numbers: ''
    };

    handleChange = name => event => {
        console.log(this.state);
        this.setState({
            [name]: event.target.value,
        });
    };

    checkVat = (numbers) => {
      let numb = numbers.split('\n');
      this.props.checkVat(numb);
    }

    render() {
        let { addVat, checkVat,classes } = this.props;
        const { country, numbers } = this.state;
        console.log(numbers);
        return (
            <form className="row mb-md-4" noValidate autoComplete="off">
                <div className="col-md-3 col-12">
                    <TextField
                        className={classes.inputCustom}
                        inputRef={(input) => {this.number = input;}}
                        required
                        multiline
                        rows="4"
                        onChange={this.handleChange('numbers')}
                        id="required"
                        label="VAT Numbers"
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div className={`${classes.alignButton} col-md-1 col-12`}>
                    <Tooltip
                        title={<ExampleInput />}
                        placement="bottom"
                        classes={{tooltip: classes.help}}
                    >
                        <HelpOutline />
                    </Tooltip>
                    <Button
                      onClick={() => {this.checkVat(numbers);}}
                      variant="raised"
                      color="primary">
                      Send
                      <IconSend style={{marginLeft: '10px'}}/>
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
    },
    checkVat(numbers) {
      dispatch({ type: 'CHECK_VAT', numbers });
    }
  }
}

const stylesTextFields = withStyles(styles)(TextFields);
export default connect(mapStateToProps, mapDispatchToProps)(stylesTextFields);