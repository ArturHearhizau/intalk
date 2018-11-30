import React, {Component} from 'react';
import moment from 'moment';
import {DatePicker} from 'material-ui-pickers';
import {withStyles} from 'material-ui/styles';
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
  test: {
      color: 'red',
      '&:hover:before':{
        backgroundColor:'rgba(66, 66, 66, 0.56)'
      }
  }
});

class DatePickers extends Component {
    state = {
        selectedDate: new Date()
    };

    handleDateChange = (date) => {
        date = date._d;
        let month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = date.getDate();
        day = day < 10 ? '0' + day : day;
        let formatDate = `${date.getFullYear()}-${month}-${day}`;
        this.props.searchByTime(formatDate);
        this.setState({selectedDate: date});
    };

    render() {
        const { selectedDate } = this.state;
        const { classes } = this.props;
        console.log(selectedDate, 'selectDate');
        return (
            <div key="basic_day" className="picker">
                <DatePicker
                    className={classes.inputCustom}
                    fullWidth
                    clearable
                    value={selectedDate}
                    onChange={this.handleDateChange}
                    animateYearScrolling={false}
                    leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                    rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                />
            </div>
        )

    }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    searchByTime(date) {
      console.log(date)
      dispatch({ type: 'SEARCH_BY_TIME_REQUEST', date: date });
    }
  }
}
const DatePickerComp = withStyles(styles)(DatePickers)
export default connect(mapStateToProps, mapDispatchToProps)(DatePickerComp);