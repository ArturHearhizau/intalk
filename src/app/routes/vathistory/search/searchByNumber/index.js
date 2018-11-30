import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import {DatePicker} from 'material-ui-pickers';
import Button from 'material-ui/Button';
import IconSend from 'material-ui-icons/Send';


const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchStyle: {
    marginRight: '10px',
    fontSize: '16px'
  },
  textField: {
    width: '150px',
    '& > div > input': {
      padding: 0
    },
    '& > div > input::placeholder': {
      fontSize: '16px'
    }
  }
});

class searchByNumber extends Component {
  state = {
    vatNumber: '',
    startDate: new Date(),
    endDate: new Date()
  }

  handlerChange = value => event => {
    this.setState({
      [value]: event.target.value
    })
  }

  handleDateChange = value => date => {
    // date = date._d;
    // let month = date.getMonth() + 1;
    // month = month < 10 ? '0' + month : month;
    // let day = date.getDate();
    // day = day < 10 ? '0' + day : day;
    // let formatDate = `${date.getFullYear()}-${month}-${day}`;
    // this.props.searchByTime(formatDate);
    this.setState({[value]: date});
  };

  render() {
    const {vatNumber, startDate, endDate} = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.paper}>
        <div className={`${classes.paper} mr-3`}>
          <Typography className="mr-2 mt-3" variant="subheading">Search by number: </Typography>
          <TextField
            className={`${classes.textField} mt-3`}
            placeholder="Input VAT number"
            value={vatNumber}
            onChange={this.handlerChange('vatNumber')}
          />
        </div>
        <div className={`${classes.paper} mr-3`}>
          <Typography className="mr-2 mt-3" variant="subheading">Start date:</Typography>
          <DatePicker
            placeholder="Choice date"
            className={`${classes.textField} mt-3`}
            clearable
            value={startDate}
            onChange={this.handleDateChange('startDate')}
            animateYearScrolling={false}
            leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
            rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
          />
        </div>
        <div className={`${classes.paper} mr-3`}>
          <Typography className="mr-2 mt-3" variant="subheading">End date:</Typography>
          <DatePicker
            placeholder="Choice date"
            className={`${classes.textField} mt-3`}
            clearable
            value={endDate}
            onChange={this.handleDateChange('endDate')}
            animateYearScrolling={false}
            leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
            rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
          />
        </div>
        <div className={`${classes.paper} mr-3`}>
          <Button
            // onClick={() => {this.checkVat(numbers);}}
            variant="raised"
            color="primary">
            Send
            <IconSend style={{marginLeft: '10px'}}/>
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(searchByNumber);
