import React, { Component } from 'react';
import CSVReader from './CSVReader';
import CSVTable from './CSVTable';
import {withStyles} from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import Button from 'material-ui/Button';
import IconSend from 'material-ui-icons/Send';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import IntlMessages from 'util/IntlMessages';
import { injectIntl, intlShape } from 'react-intl';


const styles = theme => ({
  bgGrey: {
    backgroundColor: '#f8f9fa'
  },
  dialogAct: {
    margin: '0',
    padding: '8px 4px'
  },
  dialogCont: {
    minHeight: '250px'
  },
  colName: {
    marginBottom: '8px',
    '& > div > input::placeholder': {
      fontSize: '16px'
    },
    '& > div > input': {
      lineHeight: '1.1875em'
    }
  }
})

class CSVAddVat extends Component {
  state = {
    isLoadData: false,
    data: [],
    isOpen: false,
    colName: ''
  };

  handleForce = data => {
    this.setState({
      isLoadData: true,
      data,
      isOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  }

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value
    });
  }

  render() {
    const { classes, intl } = this.props;
    const { colName, data } = this.state;
    let viewTable = this.state.data.length;
    console.log(this);
    const placeholder = intl.formatMessage({id: 'vat.csv.columnName'});
    return (
      <div>
        <TextField
          id="colName"
          placeholder={placeholder}
          className={classes.colName}
          value={colName}
          onChange={this.handleChange('colName')}
          margin="none"
        />
        <div className="mb-2">
          <label htmlFor="csv-reader">
            <Button
              variant="raised"
              color="primary"
              component="span"
            >
              <IntlMessages id="vat.csv.uploadCSVButton" />
            </Button>
          </label>
        </div>
        <CSVReader
          style={{display: 'none'}}
          id="csv-reader"
          cssClass="react-csv-input mb-md-4"
          onFileLoaded={this.handleForce}
        />
        <Dialog
          fullWidth
          maxWidth="md"
          open={this.state.isOpen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className={`${classes.bgGrey}`} id="form-dialog-title">
            <IntlMessages id="vat.csv.dialog.getCSV" />
          </DialogTitle>
          <DialogContent className={`${classes.bgGrey} ${classes.dialogCont}`}>
            <DialogContentText className="mb-2">
              <IntlMessages id="vat.csv.dialog.descr" />
            </DialogContentText>
            {
              viewTable ? <CSVTable
                handleClose={this.handleClose}
                colName={colName}
                data={data} />
                : null
            }
          </DialogContent>
          <DialogActions
            classes={{root: classes.dialogAct}}
            className={`${classes.bgGrey}`}
          >
            <Button onClick={this.handleClose} color="primary">
              <IntlMessages id="vat.csv.dialog.cancel" />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(
  injectIntl(CSVAddVat)
);