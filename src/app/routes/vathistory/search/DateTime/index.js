import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import CardBox from 'components/CardBox';
import DatePickers from './date/DatePickers';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IntlMessages from 'util/IntlMessages';


const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchStyle: {
    marginRight: '10px',
    fontSize: '16px'
  }
});

const DateTime = ({match, classes}) => {
    return (
      <div className={classes.paper}>
        <Typography className="mr-2" variant="subheading">
          <IntlMessages id="vathist.search.searchByDate" />
        </Typography>
        <DatePickers />
      </div>
    );
};

DateTime.propTypes = {
  classes: PropTypes.object.isRequired
}


export default withStyles(styles)(DateTime);

