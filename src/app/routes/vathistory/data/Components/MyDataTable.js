import React, { Component } from 'react';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import CheckIcon from 'material-ui-icons/Check';
import CloseIcon from 'material-ui-icons/Close';
import { connect } from 'react-redux';
import IntlMessages from 'util/IntlMessages';

let counter = 0;
function createData(valid, memberState, VATnum, name, adress) {
  counter += 1;
  return {id: counter, valid, memberState, VATnum, name, adress};
}

class MyTableHead extends Component {
  render() {
    return (
     <TableHead>
       <TableRow>
         <TableCell>
           <IntlMessages id="vathist.table.valid" />
         </TableCell>
         <TableCell>
           <IntlMessages id="vathist.table.memberState" />
         </TableCell>
         <TableCell>
           <IntlMessages id="vathist.table.vatNumber" />
         </TableCell>
         <TableCell>
           <IntlMessages id="vathist.table.name" />
         </TableCell>
         <TableCell>
           <IntlMessages id="vathist.table.address" />
         </TableCell>
       </TableRow>
     </TableHead>
    );
  }
}

class MyDataTable extends Component {

  render() {
    console.log(this.props);
    const { vatData } = this.props;
    let styleCheck = {width: 32, height: 32, color: '#53a318'};
    let styleClose = {width: 32, height: 32, color: '#EA4335'}
    return (
      <Paper className="table-responsive" style={{width: '100%', background: '#FAFAFA'}} elevation={1}>
        <Table>
          <MyTableHead />
          <TableBody>
            {vatData.map(value => {
              return (
                <TableRow key={value.vat_number} hover>
                  <TableCell>
                    {Boolean(Number(value.is_valid)) ?
                      <CheckIcon style={styleCheck} />
                      :
                      <CloseIcon style={styleClose} />
                    }
                  </TableCell>
                  <TableCell>
                    <div className="flex-center justify-content-start">
                      <i className={`mr-3 flag flag-32 flag-${value.country_code.toLowerCase()}`}></i>
                      {value.country_code}
                    </div>
                  </TableCell>
                  <TableCell>{value.vat_number}</TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.address}</TableCell>
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

MyDataTable.defaultProps = {
  vatData: []
}


export default MyDataTable;