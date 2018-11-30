import React from 'react';
import CheckVATArea from './checkVat/CheckVATArea';
import CheckVATSeparate from './checkVat/CheckVATSeparate';
import MyDataTable from './data/Components/MyDataTable';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import CSVAddVat from './CSVReader/CSVAddVat';
import CardHeader from 'components/dashboard/Common/CardHeader/index';
import Paper from 'material-ui/Paper';
import FormInfo from './FormInfo';
import IntlMessages from 'util/IntlMessages';


const styles = theme => ({
  cardCustom: {
    height: '170px'
  }
});

class Vat extends React.Component {
  componentWillMount() {
    this.props.initVatHistory();
  }

  render() {
    console.log(this.props, 'vat');
    const { classes, user } = this.props;
    let getInfo = false;
    if(user.last_name === ''
      && user.name === ''
      && user.phone_number === '') {
      getInfo = true;
    }
    return (
      <div className="app-wrapper">
        {getInfo ? <FormInfo /> : null}
        <Paper>
          <div className="jr-card">
            <CardHeader heading={<IntlMessages id="vat.checkvat.checkSeparate" />} />
            <CheckVATSeparate />
          </div>
        </Paper>
        <div className="row">
          <div className="col-lg-6 col-12">
            <Paper>
              <div className="jr-card">
                <CardHeader heading={<IntlMessages id="vat.checkvat.bulkChecking" />} />
                <CheckVATArea />
              </div>
            </Paper>
          </div>
          <div className="col-lg-6 col-12">
            <Paper>
              <div className={`jr-card ${classes.cardCustom}`}>
                <CardHeader
                  styleName="mb-0"
                  heading={<IntlMessages id="vat.csv.uploadCSVTitle" />}
                  subHeading={<IntlMessages id="vat.csv.subHeading" />}
                />
                <CSVAddVat />
              </div>
            </Paper>
          </div>
        </div>
        <MyDataTable />
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user
  }
}

function mapDispathToProps(dispatch) {
  return {
    initVatHistory() {
      dispatch({ type: 'LOAD_VAT' });
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(
  withStyles(styles)(Vat)
);