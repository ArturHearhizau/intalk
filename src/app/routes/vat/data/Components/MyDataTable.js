import React, { Component } from 'react';
import {withStyles} from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';
import CheckIcon from 'material-ui-icons/Check';
import CloseIcon from 'material-ui-icons/Close';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/ModeEdit';
import DoneIcon from 'material-ui-icons/Done';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui/Progress';
import Edit from '../../Edit';
import IntlMessages from 'util/IntlMessages';


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
  },
  checkCell: {
    width: '13%'
  },
  textCenter: {
    textAlign: 'center'
  },
  alignCheckbox: {
    paddingLeft: '40%'
  },
  overX: {
    overflowX: 'scroll'
  }
});

class MyTableHead extends Component {
  render() {
    const { classes } = this.props;
    return (
     <TableHead>
       <TableRow>
         <TableCell padding="dense" style={{ width: '5%'}}>
           <IntlMessages id="vat.table.valid" />
         </TableCell>
         <TableCell padding="dense" className="text-center">
           <IntlMessages id="vat.table.memberState" />
         </TableCell>
         <TableCell padding="dense">
           <IntlMessages id="vat.table.vatNumber" />
         </TableCell>
         <TableCell padding="dense">
           <IntlMessages id="vat.table.name" />
         </TableCell>
         <TableCell padding="dense">
           <IntlMessages id="vat.table.address" />
         </TableCell>
         <TableCell padding="dense" className={classes.textCenter}>
           <Tooltip
             title={<IntlMessages id="vat.table.checkTooltip" />}
             placement="bottom"
             enterDelay={300}>
             <span><IntlMessages id="vat.table.check" /></span>
           </Tooltip>
         </TableCell>
         <TableCell padding="dense" className="text-center">
           <IntlMessages id="vat.table.edit" />
         </TableCell>
         <TableCell className="text-center" padding="dense">
           <IntlMessages id="vat.table.delete" />
         </TableCell>
       </TableRow>
     </TableHead>
    );
  }
}

const EDIT = 'edit';

class MyDataTable extends Component {
  state = {
    isEdit: false,
    editValue: '',
    editState: '',
    lastValue: '',
    lastState: '',
    recieveData: false
  };

  componentWillReceiveProps(nextProps) {
    console.log('MyDataTable componentWillReceiveProps')
    this.state.recieveData = true;
    nextProps.vatData.map(value => {
      console.log(value.check);
      this.state[value.VATnum] = value.check;
      this.state[value.memberState + value.VATnum + EDIT] = false;
    })
  }

  editVatHandler = () => {
    this.setState({
      editValue: '',
      editState: ''
    })
  }

  deleteVatNumber = (number, state) => {
    this.props.deleteVatNumber(`${state}${number}`);
  }

  handleChangeCheck = (number, state) => event => {
    this.props.toggleCheckVat(`${state}${number}`);
    this.setState({
      [number]: event.target.checked
    });
  }

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value
    })
  }

  editHandler = (memberState, vatnum) => {
    this.setState({
      [memberState + vatnum + EDIT]: !this.state[memberState + vatnum + EDIT],
      lastValue: vatnum,
      lastState: memberState,
      editValue: vatnum,
      editState: memberState
    })
  }

  render() {
    // console.log(this.props);
    let { vatData, classes, updateVat, user } = this.props;
    const { isEdit, editState, editValue, lastState, lastValue, recieveData } = this.state;
    // if (vatData.length === 0) {
    //   return ();
    // }
    return (
      <Paper className={`table-responsive ${user.membership === 'TRIAL' ? 'mb-36' : ''}`}>
        <Table>
          <MyTableHead classes={classes}/>
          <TableBody>
            {
              !recieveData ?
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  <CircularProgress size={50} />
                </TableCell>
              </TableRow>
              :
              vatData.map(value => {
                return (
                  <TableRow key={value.id} hover>
                    <TableCell padding="dense" className="text-center">
                      {value.valid ?
                        <CheckIcon className={classes.checkIcon} />
                        :
                        <CloseIcon className={classes.closeIcon} />
                      }
                    </TableCell>
                    <TableCell  padding="dense">
                      <div className="flex-center justify-content-center">
                        {this.state[value.memberState + value.VATnum + EDIT] ?
                          null
                          : <i className={`mr-3 flag flag-32 flag-${value.memberState.toLowerCase()}`}></i>
                        }
                        <Edit
                          initValue={value.memberState}
                          value={this.state.editState}
                          isEdit={this.state[value.memberState + value.VATnum + EDIT]}
                          handleChange={this.handleChange('editState')}
                          updateVat={updateVat}
                        />
                      </div>
                      </TableCell>
                    <TableCell padding="dense">
                      <Edit
                        initValue={value.VATnum}
                        value={this.state.editValue}
                        isEdit={this.state[value.memberState + value.VATnum + EDIT]}
                        handleChange={this.handleChange('editValue')}
                      />
                    </TableCell>
                    <TableCell padding="dense">{value.name}</TableCell>
                    <TableCell padding="dense">{value.adress}</TableCell>
                    <TableCell padding="dense" className={classes.checkCell}>
                      <div className="flex-center">
                        <Checkbox
                          checked={this.state[value.VATnum]}
                          onChange={this.handleChangeCheck(value.VATnum, value.memberState)}
                          value={value.VATnum}
                          color="primary"
                          component="div"
                        />
                      </div>
                    </TableCell>
                    <TableCell
                      padding="dense"
                      onClick={() => this.editHandler(value.memberState, value.VATnum)}
                      className={`${classes.basket} text-center`}
                    >
                      {this.state[value.memberState + value.VATnum + EDIT]
                        ? <DoneIcon onClick={() => updateVat(editState, editValue, lastState, lastValue)}/>
                        : <EditIcon />
                      }
                    </TableCell>
                    <TableCell
                      padding="dense"
                      onClick={() => {this.deleteVatNumber(value.VATnum, value.memberState)}}
                      className={classes.basket}>
                      <div className={`flex-center ${classes.alignCenter}`}>
                        <DeleteIcon />
                      </div>
                    </TableCell>
                  </TableRow>
                );
            })
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

function mapStateToProps({ vatData, user }) {
  return { vatData, user };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleCheckVat(number) {
      dispatch({ type: 'TOGGLE_CHECK', number });
    },
    deleteVatNumber(number) {
      dispatch({ type:'DELETE_VAT_NUMBER_REQUEST', number });
    },
    updateVat(editState, editValue, lastState, lastValue) {
      // console.log('updateVat', editNumber, lastState, lastNumber);
      dispatch({ type: 'UPDATE_VAT_REQUEST', editState, editValue, lastState, lastValue });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(MyDataTable)
);