import React from 'react';
import ExpansionPanel from './expansionPanel';
import Search from './search';
import { connect } from 'react-redux';
import SearchExpansionPanel from './searchExpansionPanel';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class VatHistory extends React.Component {
  componentWillMount() {
    let date = (new Date()).setDate(-15);
    this.props.loadVatHistory(date);
  }
  render() {
    return (
      <div className="app-wrapper">
        <Search />
        <SearchExpansionPanel />
        <ExpansionPanel />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    loadVatHistory(startDate) {
      dispatch({ type: 'LOAD_VAT_HISTORY', startDate })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VatHistory);