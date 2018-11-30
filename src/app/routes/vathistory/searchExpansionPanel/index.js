import React, { Component } from 'react';
import SearchVatExpansionPanels from './search';
import { connect } from 'react-redux';
import CardBox from '../../../../components/CardBox';


class SearchVatPanel extends Component {
  render() {
    let len = Object.keys(this.props.vatSearch).length;
    console.log(len);
    return (
      <div>
        {len === 0 ?
          null
          :
          <div className="animated slideInUpTiny animation-duration-3">
            <div className="row mb-md-4">
              <CardBox
                styleName="col-lg-12"
                cardStyle="bg-transparent no-shadow p-0"
                heading="Vat Search"
                headerOutside>
                <SearchVatExpansionPanels />
              </CardBox>
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    vatSearch: state.vatSearch
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchVatPanel);