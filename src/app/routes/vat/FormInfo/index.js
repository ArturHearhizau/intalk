import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import CardHeader from 'components/dashboard/Common/CardHeader/index';
import TextField from 'material-ui/TextField';
import IconSend from 'material-ui-icons/Send';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import HelpOutline from 'material-ui-icons/HelpOutline';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  textField: {
    margin: '8px',
    '& > div > input': {
      lineHeight: '1.1875em'
    }
  },
  help: {
    fontSize: '14px'
  }
});

const mask = function(rawValue) {
  let index = rawValue.search(/\D/);
  if(index === -1) return rawValue;
  return rawValue.substr(0, index);
}

function Header(props) {
  return (
    <div className="flex-center">
      <span className="mr-2 flex-center">Basic info</span>
      <Tooltip
        className="flex-center"
        classes={{tooltip: props.classes.help}}
        title="Input basic data of you one time"
        placement="bottom"
      >
        <HelpOutline />
      </Tooltip>
    </div>
  );
}

class FormInfo extends Component {
  state = {
    name: '',
    lastName: '',
    phoneNumber: '',
    error: {
      isError: false,
      message: ''
    }
  }

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value
    });
  }

  handleChangePhone = event => {
    this.setState({
      'phoneNumber': mask(event.target.value)
    });
  }

  sendData = (name, lastName, phoneNumber) => {
    if(name.length === 0) {
      this.setState({
        error: {
          isError: true,
          message: 'Name is required'
        }
      });
      return;
    }
    if(lastName.length === 0) {
      this.setState({
        error: {
          isError: true,
          message: 'Last name is required'
        }
      });
      return;
    }
    if(phoneNumber.length === 0) {
      this.setState({
        error: {
          isError: true,
          message: 'Phone number is required'
        }
      });
      return;
    }
    this.props.sendBaseInfo(name, lastName, phoneNumber);
  }

  render() {
    const { classes } = this.props;
    const { name, lastName, phoneNumber, error, isSend } = this.state;
    return (
      <Paper className="mb-2">
        <div className="jr-card">
          <div className="row">
            <div className="col-12">
              <CardHeader heading={<Header classes={classes} />} />
              {error.isError ?
                <Typography color="error">{error.message}</Typography>
                : null
              }
              <div className="flex-center justify-content-start">
                <TextField
                  id="name"
                  label="Name"
                  className={`ml-0 ${classes.textField}`}
                  value={name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
                <TextField
                  id="name"
                  label="Last name"
                  className={classes.textField}
                  value={lastName}
                  onChange={this.handleChange('lastName')}
                  margin="normal"
                />
                <TextField
                  id="name"
                  label="Phone number"
                  className={classes.textField}
                  value={phoneNumber}
                  onChange={this.handleChangePhone}
                  margin="normal"
                />
                <Button
                  className="ml-4"
                  onClick={() => {this.sendData(name, lastName, phoneNumber);}}
                  variant="raised"
                  color="primary"
                >
                  Send
                  <IconSend style={{marginLeft: '10px'}}/>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    sendBaseInfo(name, lastName, phoneNumber) {
      dispatch({ type: 'SEND_BASIC_DATA', name, lastName, phoneNumber })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(FormInfo)
);