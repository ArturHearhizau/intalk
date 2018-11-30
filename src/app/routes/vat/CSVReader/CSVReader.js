import React, { Component } from 'react';
import { string, func, element, oneOfType } from 'prop-types';
const PapaParse = require('papaparse/papaparse.min.js');


class CSVReader extends Component {
// ({ cssClass = 'csv-reader-input', label, onFileLoaded, onError, ...props }) {


  // let fileContent = undefined;
  // let input;
  // this.input = null;
  handleChangeFile = e => {
    let reader = new FileReader();
    let { onFileLoaded, onError } = this.props;
    reader.onload = event => {
      const csvData = PapaParse.parse(event.target.result, {
        error: onError
      });
      onFileLoaded(csvData.data);
    };

    reader.readAsText(e.target.files[0]);
    this.input.value = '';
  };

  render(){
    let { cssClass = 'csv-reader-input', label, ...props } = this.props;
    return (
      <div className={cssClass}>
        {label && <label>{label}</label>}
        <input {...props} className="csv-input" ref={input => {this.input = input;}} type="file" accept="text/csv" onChange={e => {this.handleChangeFile(e)}} />
      </div>
    );
  }

}

CSVReader.propTypes = {
  cssClass: string,
  label: oneOfType([string, element]),
  onFileLoaded: func,
  onError: func
};

export default CSVReader;
