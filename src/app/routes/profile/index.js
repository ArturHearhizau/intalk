import React from 'react';
import { connect } from 'react-redux';
import SimpleList from './dividers/SimpleList';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class Profile extends React.Component {

  render() {
    return (
      <div className="app-wrapper">
        <div className="row mb-md-4">
          <div className="col-md-6">
            <Paper>
              <Typography variant="display1"  style={{padding: '18px 24px'}} className="card-title">
                Profile
              </Typography>
              <SimpleList />
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ settings }) {
  return {settings}
}

function mapDispathToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispathToProps)(Profile);