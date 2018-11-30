import React, { Component } from 'react';
import ContainerHeader from 'components/ContainerHeader';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from 'recharts';
import ChartCard from 'components/dashboard/Common/ChartCard';
import Card from 'material-ui/Card';
import {cardData, cardData1, cardData2, connections, data1, expanseData, todoData} from './data'
import {chartDataWithoutAxis, data2} from 'app/routes/dashboard/routes/ECommerce/data'
import Button from 'material-ui/Button';
import { connect } from 'react-redux';

class Admin extends Component {

  componentDidMount() {
    this.props.getAdminStat();
  }

  render() {
    let { admin } = this.props;
    console.log(admin, 'admin');
    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          className="text-center"
          title="Admin Panel"
          description="Showcase your services here with information about them"
        />
        <div className="row">
          <div className="col-lg-3 col-sm-6 col-12">
            <Card className="bg-secondary text-white jr-card">
              <div className="chart-title">
                <h3>{admin.countSubscribers}</h3>
                <p>Online Signups</p>
              </div>

              {/*<ResponsiveContainer width="100%" height={110}>*/}
                {/*<BarChart data={chartDataWithoutAxis}*/}
                          {/*margin={{top: 25, right: 25, bottom: 5, left: 25}}>*/}
                  {/*<Bar dataKey="amt" fill="white" maxBarSize={7}/>*/}
                {/*</BarChart>*/}
              {/*</ResponsiveContainer>*/}
            </Card>
          </div>

          <div className="col-lg-3 col-sm-6 col-12">
            <Card className="bg-primary text-white jr-card">
              <div className="chart-title">
                <h3>{admin.totalByMonth}&euro;</h3>
                <p>Last Month Sale</p>
              </div>

              {/*<ResponsiveContainer width="100%" height={110}>*/}
                {/*<AreaChart data={data1} margin={{top: 0, right: 0, bottom: 0, left: 0}}>*/}
                  {/*<Area type="monotone" dataKey="pv" stroke="rgba(255,255,255,0.5)" activeDot={{r: 8}}*/}
                        {/*fillOpacity={.5}*/}
                        {/*fill="white"/>*/}
                {/*</AreaChart>*/}
              {/*</ResponsiveContainer>*/}
            </Card>
          </div>

          <div className="col-lg-3 col-sm-6 col-12">
            <Card className="bg-teal lighten-1 text-white jr-card">
              <div className="chart-title">
                <h3>{admin.countNewUsers}</h3>
                <p>New Users this month</p>
              </div>

              {/*<ResponsiveContainer width="100%" height={110}>*/}
                {/*<LineChart data={data2}>*/}
                  {/*<Line type="monotone" dataKey="uv" stroke="#ffffff" activeDot={{r: 8}}/>*/}
                  {/*<Line type="monotone" dataKey="pv" stroke="#ffffff"/>*/}
                  {/*<Line type="monotone" dataKey="amt" stroke="#ffffff"/>*/}
                {/*</LineChart>*/}
              {/*</ResponsiveContainer>*/}

            </Card>
          </div>

          <div className="col-lg-3 col-sm-6 col-12">
            <Card className="bg-blue text-white jr-card">
              <div className="chart-title">
                <h3>{admin.totalByYear}&euro;</h3>
                <p>Total Revenue this year</p>
              </div>

              {/*<ResponsiveContainer width="100%" height={110}>*/}
                {/*<LineChart data={data1} margin={{top: 0, right: 30, bottom: 0, left: 30}}>*/}
                  {/*<Line dataKey="uv" stroke="#ffffff" activeDot={{r: 8}}/>*/}
                {/*</LineChart>*/}
              {/*</ResponsiveContainer>*/}
            </Card>
          </div>
          <div className="col-12">
            <div>
              <Button
                color="primary"
                className="text-white"
                variant="raised"
                href="https://auth-db142.hostinger.com/index.php"
              >
                PhpMyAdmin
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ admin }) => {
  return { admin };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAdminStat() {
      dispatch({ type: 'GET_ADMIN_STAT_REQUEST' });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
