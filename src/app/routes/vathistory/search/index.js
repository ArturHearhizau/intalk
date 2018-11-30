import React, { Component } from 'react';
import DateTime from './DateTime';
import SearchByNumber from './searchByNumber';
import Paper from 'material-ui/Paper';


export default class Search extends Component {
  render() {
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="row mb-md-4">
          <div className="col-lg-12">
            <Paper className="jr-card">
              <DateTime className="mb-2" />
              {/*<SearchByNumber />*/}
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}
