import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import MaskedInput from 'react-text-mask';
import Menu, { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import IconSend from 'material-ui-icons/Send';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import IntlMessages from 'util/IntlMessages';


const mask = function(rawValue) {
  let index = rawValue.search(/\D/);
  if(index === -1) return [rawValue];
  return [rawValue.substr(0, index)];
}

const countrys = [
  {value: 'AT', label: 'AT-Austria'},
  {value: 'BE', label: 'BE-Belgium'},
  {value: 'BG', label: 'BG-Bulgaria'},
  {value: 'CY', label: 'CY-Cyprus'},
  {value: 'CZ', label: 'CZ-Czech Republic'},
  {value: 'DE', label: 'DE-Germany'},
  {value: 'DK', label: 'DK-Denmark'},
  {value: 'EE', label: 'EE-Estonia'},
  {value: 'EL', label: 'EL-Greece'},
  {value: 'ES', label: 'ES-Spain'},
  {value: 'FI', label: 'FI-Finland'},
  {value: 'FR', label: 'FR-France'},
  {value: 'GB', label: 'GB-United Kingdom'},
  {value: 'HR', label: 'HR-Croatia'},
  {value: 'HU', label: 'HU-Hungary'},
  {value: 'IE', label: 'IE-Ireland'},
  {value: 'IT', label: 'IT-Italy'},
  {value: 'LT', label: 'LT-Lithuania'},
  {value: 'LU', label: 'LU-Luxembourg'},
  {value: 'LV', label: 'LV-Latvia'},
  {value: 'MT', label: 'MT-Malta'},
  {value: 'NL', label: 'NL-The Netherlands'},
  {value: 'PL', label: 'PL-Poland'},
  {value: 'PT', label: 'PT-Portugal'},
  {value: 'RO', label: 'RO-Romania'},
  {value: 'SE', label: 'SE-Sweden'},
  {value: 'SI', label: 'SI-Slovenia'},
  {value: 'SK', label: 'SK-Slovakia'}
];


const styles = (theme) => ({
  fz: {
    fontSize: '48px'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 220,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0 0 8px 0'
    }
  },
  formControlFirst: {
    marginLeft: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '8px 0 0 0'
    }
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  inputNumber:{
    lineHeight: '1.1875em'
  },
  maxHeight: {
    height: '300px'
  },
  alignElements: {
    marginTop: '-30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={mask}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

class CheckVATSeparate extends Component {
  state = {
    country: '',
    number: ''
  };

  handleChange = value => event => {
    let focus = this.state.inputNumberFocus;
    if (value === 'country') {
      focus = true;
    }
    this.setState({
      [value]: event.target.value,
    });
  }

  checkVat = () => {
    let { country, number } = this.state;
    this.setState({
      country: '',
      number: ''
    })
    this.props.checkVat([
      `${country}${number}`
    ]);
  }

  render() {
    const { classes } = this.props;
    const { number, country, inputNumberFocus } = this.state;
    console.log(this.state);
    return (
      <div className={classes.alignElements}>
        <FormControl className={`${classes.formControl} ${classes.formControlFirst}`}>
          <InputLabel htmlFor="uncontrolled-native">
            <IntlMessages id="vat.checkvat.chouseCountry" />
          </InputLabel>
          <Select
            value={country}
            onChange={this.handleChange('country')}
            inputProps={{
              name: 'age123',
              kek: 'age-simple',
            }}
            input={<Input id="uncontrolled-native" />}
          >
            {countrys.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl onFocus={this.test} className={classes.formControl} ref={el => { this.inputNumber = el }}>
          <InputLabel htmlFor="name-input" id="entry-vat">
            <IntlMessages id="vat.checkvat.entryVat" />
          </InputLabel>
          <Input
            value={number}
            classes={{input: classes.inputNumber}}
            onChange={this.handleChange('number')}
            id="formatted-text-mask-input"
            inputComponent={TextMaskCustom}
          />
          <FormHelperText>
            <IntlMessages id="vat.checkvat.acceptChars" />
          </FormHelperText>
        </FormControl>
        <Button
          className="ml-4"
          onClick={() => {this.checkVat();}}
          variant="raised"
          color="primary"
        >
          <IntlMessages id="vat.checkvat.send" />
          <IconSend style={{marginLeft: '10px'}}/>
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    checkVat(numbers) {
      dispatch({ type: 'CHECK_VAT', numbers });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(CheckVATSeparate)
);