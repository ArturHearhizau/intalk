import React, { Component } from 'react';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import DeleteIcon from 'material-ui-icons/Delete';
import IconSend from 'material-ui-icons/Send';
import EditIcon from 'material-ui-icons/ModeEdit';
import Edit from '../Edit';
import DoneIcon from 'material-ui-icons/Done';
import IntlMessages from 'util/IntlMessages';


const styles = theme => ({
  basket: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.54)',
    '&:hover' : {
      cursor: 'pointer',
      transition: 'color 0.2s ease-in',
      color: '#212121'
    }
  },
  sendButton: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  vatColumn: {
    width: '60%'
  }
});

const EDIT = 'edit';


class CSVTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: props.data.shift(),
      data: props.data,
      toCheck: [],
      dataColumn: []
    };
    this.componentWillReceiveProps(props);
  }

  componentWillReceiveProps(nextProps) {
    let indexOfColumn = this.findIndexColumn(nextProps.colName);
    nextProps.data.forEach(value => {
      if(value[indexOfColumn] === undefined || value[indexOfColumn] === '') {
        return;
      }
      this.state.dataColumn.push(value[indexOfColumn]);
      this.state[value[indexOfColumn] + EDIT] = false;
    })
  }

  deleteRow = index => {
    this.state.dataColumn.splice(index, 1);
    this.setState({
      dataColumn: this.state.dataColumn
    });
  }

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value
    })
  }

  findIndexColumn = name => {
    let indexOfColumn = this.state.header.findIndex(value => value === this.props.colName);
    indexOfColumn = indexOfColumn === -1 ? 0 : indexOfColumn;
    return indexOfColumn;
  }

  checkVat = (numbers) => {
    numbers = numbers.map(value => value.split(/-|\s/).join(''));
    this.props.checkVat(numbers);
    this.props.handleClose();
    this.setState({
      data: [],
      header: [],
      toCheck: []
    })
  }

  editHandler = number => {
    this.setState({
      [number + EDIT]: !this.state[number + EDIT],
      editState: number
    });
  }

  update = (prevValue, newValue) => {
    let index = this.state.dataColumn.findIndex(val => val === prevValue);
    this.state.dataColumn[index] = newValue;
    this.setState({
      [prevValue + EDIT]: false
    });
  }

  render() {
    let { header, dataColumn, toCheck } = this.state;
    let { classes, colName } = this.props;
    if (!dataColumn.length) {
      return null;
    }
    let indexOfVats = this.findIndexColumn(colName);
    return (
      <div className="row">
        <div className="col-12 mb-2">
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.vatColumn}>
                    {header[indexOfVats]}
                  </TableCell>
                  <TableCell className="text-center">
                    <IntlMessages id="vat.csv.dialog.edit" />
                  </TableCell>
                  <TableCell className="text-center">
                    <IntlMessages id="vat.csv.dialog.delete" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataColumn.map((value, index) => {
                  if(Boolean(value) === false)
                    return null;
                  return (
                    <TableRow className={classes.vatColumn} key={value} hover>
                      <TableCell key={value}>
                        <Edit
                          initValue={value}
                          value={this.state.editState}
                          isEdit={this.state[value + EDIT]}
                          handleChange={this.handleChange('editState')}
                        />
                      </TableCell>
                      <TableCell
                        className={`${classes.basket} text-center`}
                      >
                        {this.state[value + EDIT]
                          ? <DoneIcon onClick={() => this.update(value, this.state.editState)}/>
                          : <EditIcon onClick={() => this.editHandler(value)} />
                        }
                      </TableCell>
                      <TableCell
                        className={classes.basket}
                        onClick={() => {this.deleteRow(index)}}
                      >
                        <DeleteIcon />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
        <div className={`${classes.sendButton} col-md-6`}>
          <Button
            onClick={() => { this.checkVat(dataColumn); }}
            variant="raised"
            color="primary"
          >
            <IntlMessages id="vat.csv.dialog.send" />
            <IconSend style={{marginLeft: '10px'}}/>
          </Button>
        </div>
      </div>
    );
  }
}

CSVTable.defaultProps = {
  data: []
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    checkVat(numbers) {
      dispatch({ type: 'CHECK_VAT', numbers });
    }
  };
}

const StyleCSVTable = withStyles(styles)(CSVTable);
export default connect(mapStateToProps, mapDispatchToProps)(StyleCSVTable);