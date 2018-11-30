import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ExpansionPanel, {ExpansionPanelDetails, ExpansionPanelSummary} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import MailIcon from 'material-ui-icons/MailOutline';
import { connect } from 'react-redux';
import {CSVLink, CSVDownload} from 'react-csv';
import MyTableData from '../../data/Components/MyDataTable';
import FormDialog from '../../dialogs/FormDialog';
import { CircularProgress } from 'material-ui/Progress';
import Hidden from 'material-ui/Hidden';
import IntlMessages from 'util/IntlMessages';


const styles = theme => ({
  root: {
      width: '100%',
  },
  heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.87)'
  },
  button: {
      '& > div:nth-child(1)': {
          justifyContent: 'space-between',
          alignItems: 'center'
      },
      background: '#f1f1f1'
  },
  expDetails: {
    background: '#f1f1f1'
  },
  downloadCSV: {
      display: 'flex',
      alignItems: 'center'
  },
  sendEmail: {
    color: '#3f51b5!important',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
});


const DATE = 'DATE';

class VatExpansionPanel extends React.Component {

  state = {
    curDate: '',
    open: false,
    recieveData: false
  }

  componentWillReceiveProps(nextProps) {
    this.state.recieveData = true;
  }

  handlerOpen = value => {
    this.setState({
      open: true,
      curDate: value
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSend = email => {
    //28 its start index of begin data
    // console.log(email, this.state[this.state.curDate + DATE].link.href.slice(28));
    this.setState({ open: false });
    this.props.sendCSV(email, this.state[this.state.curDate + DATE].link.href.slice(28));
  }

  render() {
    const { vatHistory, classes, getData, downloadCSV } = this.props;
    // при каждом новом стейте рендериться все заново
    console.log(vatHistory);
    if (!this.state.recieveData) {
      return (
        <div className="text-center">
          <CircularProgress size={50} />
        </div>
      );
    }

    return (
      <div className={classes.root}>
        {Object.keys(vatHistory).map(value => {
          console.log(value, 'vatHistory');
          let date = new Date(value);
          let month = date.getMonth() + 1;
          let data = vatHistory[value];
          data.forEach(value => {
            value.name = value.name.split('\n').join(' ');
            value.address = value.address.split('\n').join(' ');
          });
          month = month < 10 ? '0' + month : month;
          return (
            <ExpansionPanel key={value}>
              <ExpansionPanelSummary
                className={classes.button}
                expandIcon={<ExpandMoreIcon/>}
              >
                <div>
                  <Typography className={classes.heading}>
                    {`${date.getDate()} / ${month} / ${date.getFullYear()}`}
                  </Typography>
                </div>
                <Typography
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={classes.downloadCSV}
                >
                  <CSVLink
                    target="_self"
                    className={`${classes.sendEmail} mr-3 flex-center`}
                    data={data}
                    ref={el => this.state[value+DATE] = el}
                  >
                    <FileDownloadIcon className={classes.icon} />
                    <Hidden smDown>
                      <IntlMessages id="vathist.panel.downloadCSV" />
                    </Hidden>
                  </CSVLink>
                  <span
                    className={`${classes.sendEmail} flex-center`}
                    onClick={() => this.handlerOpen(value)}
                  >
                    <MailIcon  className={`mr-1 ${classes.icon}`} />
                    <Hidden smDown>
                      <IntlMessages id="vathist.panel.sendEmail" />
                    </Hidden>
                  </span>
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.expDetails}>
                <MyTableData vatData={data} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
        <FormDialog
          handlerOpen={this.handlerOpen}
          open={this.state.open}
          handleSend={this.handleSend}
          handleClose={this.handleClose}
        />
      </div>
    );
  }

  componentDidMount() {
    console.log('vat extension', this);
  }
}

VatExpansionPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    vatHistory: state.vatHistory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getData(date) {
      dispatch({ type: 'GET_DATA', date });
    },
    sendCSV(email, data) {
      dispatch({ type: 'SEND_CSV', email, data });
    },
    downloadCSV(date) {
      dispatch({ type: 'DOWNLOAD_CSV', date});
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(VatExpansionPanel)
);