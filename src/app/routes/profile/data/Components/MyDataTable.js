import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import {withStyles} from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';
import CheckIcon from 'material-ui-icons/Check';
import CloseIcon from 'material-ui-icons/Close';
import DeleteIcon from 'material-ui-icons/Delete';
import { connect } from 'react-redux';

let counter = 0;
function createData(valid, memberState, VATnum, name, adress) {
  counter += 1;
  return {id: counter, valid, memberState, VATnum, name, adress};
}

const styles = theme => ({
  basket: {
    color: 'rgba(0, 0, 0, 0.54)',
    '&:hover' : {
      cursor: 'pointer',
      transition: 'color 0.2s ease-in',
      color: '#212121'
    }
  },
  checkIcon: {
    width: 32,
    height: 32,
    color: '#53a318'
  },
  closeIcon: {
    width: 32,
    height: 32,
    color: '#EA4335'
  }
});

class MyTableHead extends Component {
  render() {
    return (
     <TableHead>
       <TableRow>
         <TableCell>Valid</TableCell>
         <TableCell>Member State</TableCell>
         <TableCell>VAT Number</TableCell>
         <TableCell>Name</TableCell>
         <TableCell>Address</TableCell>
         <TableCell>
           <Tooltip
             title="Vat number will check every day"
             placement="bottom"
             enterDelay={300}>
             <span>Check every day</span>
           </Tooltip>
         </TableCell>
         <TableCell>Delete</TableCell>
       </TableRow>
     </TableHead>
    );
  }
}

class MyDataTable extends Component {
  state = {};
  componentWillReceiveProps(nextProps) {
    nextProps.vatData.map(value => {
      console.log(value.check);
      this.state[value.VATnum] = value.check;
    })
  }

  deleteVatNumber = (number, state) => {
    this.props.deleteVatNumber(`${state}${number}`);
  }

  handleChange = (number, state) => event => {
    this.props.toggleCheckVat(`${state}${number}`);
    this.setState({
      [number]: event.target.checked
    });
  };

  render() {
    console.log(this.props);
    const { vatData, classes } = this.props;
    let styleCheck = {width: 32, height: 32, color: '#53a318'};
    let styleClose = {width: 32, height: 32, color: '#EA4335'}
    console.log(this.state, 'table');
    return (
      <Paper>
        <Table>
          <MyTableHead />
          <TableBody>
            {vatData.map(value => {
              return (
                <TableRow key={value.id} hover>
                  <TableCell>
                    {value.valid ?
                      <CheckIcon className={classes.checkIcon} />
                      :
                      <CloseIcon className={classes.closeIcon} />
                    }
                  </TableCell>
                  <TableCell>{value.memberState}</TableCell>
                  <TableCell>{value.VATnum}</TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.adress}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={this.state[value.VATnum]}
                      onChange={this.handleChange(value.VATnum, value.memberState)}
                      value={value.VATnum}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell
                    onClick={() => {this.deleteVatNumber(value.VATnum, value.memberState)}}
                    className={classes.basket}>
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return { vatData: state.vatData };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleCheckVat(number) {
      dispatch({ type: 'TOGGLE_CHECK', number });
    },
    deleteVatNumber(number) {
      dispatch({ type:'DELETE_VAT_NUMBER_REQUEST', number });
    }
  }
}

const styledMyDataTable = withStyles(styles)(MyDataTable);

export default connect(mapStateToProps, mapDispatchToProps)(styledMyDataTable);