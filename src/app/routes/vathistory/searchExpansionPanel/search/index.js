import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ExpansionPanel, {ExpansionPanelDetails, ExpansionPanelSummary,} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import FileDownloadIcon from 'material-ui-icons/FileDownload';
import { connect } from 'react-redux';
import {CSVLink} from 'react-csv';
import MyTableData from '../../data/Components/MyDataTable';
import IntlMessages from 'util/IntlMessages';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
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
  }
});

const csvData =[
  ['firstname', 'lastname', 'email'] ,
  ['Ahmed', 'Tomi' , 'ah@smthing.co.com'] ,
  ['Raed', 'Labes' , 'rl@smthing.co.com'] ,
  ['Yezzi','Min l3b', 'ymin@cocococo.com']
];

function VatExpansionPanel(props) {
  // let i=0;
  console.log('vat extension', props);
  const { vatSearch, classes } = props;
  // при каждом новом стейте рендериться все заново
  console.log(vatSearch);
  let predicat = function(a, b) {
    return new Date(b) - new Date(a);
  };

  return (
    <div className={classes.root}>
      {Object.keys(vatSearch).sort(predicat).map(value => {
        console.log(value, 'vatHistory');
        let date = new Date(value);
        let month = date.getMonth() + 1;
        let data = vatSearch[value];
        month = month < 10 ? '0' + month : month;
        return (
          <ExpansionPanel key={value}>
            <ExpansionPanelSummary
              className={classes.button}
              expandIcon={<ExpandMoreIcon/>}>
              <div>
                <Typography className={classes.heading}>
                  {`${date.getDate()} / ${month} / ${date.getFullYear()}`}
                </Typography>
              </div>
              <Typography onClick={(e) => {
                e.stopPropagation();
              }} className={classes.downloadCSV}
              >
                <FileDownloadIcon />
                <CSVLink data={data} className="lol">
                  <IntlMessages id="vathist.panel.downloadCSV" />
                </CSVLink>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expDetails}>
              <MyTableData vatData={data} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })
      }
    </div>
  );
}

VatExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    vatSearch: state.vatSearch
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const VatPanel = withStyles(styles)(VatExpansionPanel);

export default connect(mapStateToProps, mapDispatchToProps)(VatPanel);