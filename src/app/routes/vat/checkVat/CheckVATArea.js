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
import IntlMessages from 'util/IntlMessages';


const styles = theme => ({
  inputCustom: {
    marginTop: '-52px',
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
                <IntlMessages id="vat.checkvat.exampleInput" />
            </div>
            <div>
                GB3124141314
                GB 312-4143-223
                GB 5232141441
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
        this.setState({
          numbers: ''
        });
        let numb = numbers.split('\n');
        numb = numb.map(value => value.split(/-|\s/).join(''));
        this.props.checkVat(numb);
    }

    render() {
        let { addVat, checkVat,classes } = this.props;
        const { country, numbers } = this.state;
        console.log(numbers);
        return (
            <form className="row" noValidate autoComplete="off">
                <div className="col-md-6 col-12">
                    <TextField
                        value={numbers}
                        className={classes.inputCustom}
                        inputRef={(input) => {this.number = input;}}
                        required
                        multiline
                        rows="3"
                        onChange={this.handleChange('numbers')}
                        id="required"
                        label={
                            <IntlMessages id="vat.checkvat.vatNumbers" />
                        }
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div className={`${classes.alignButton}`}>
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
                        color="primary"
                    >
                        <IntlMessages id="vat.checkvat.send" />
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