import React from 'react';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux'
import moment from 'moment';
import IntlMessages from 'util/IntlMessages';


const styles = theme => ({
    iconList: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '1.5em'
    }
});

function SimpleList({ user, classes }) {
    let date = moment(user.created_at);
    date = date.add(30, 'day').format('MM - DD - YYYY, h:mm');
    return (
        <div className="">
            <List>

                <ListItem>
                    <i className={`${classes.iconList} zmdi zmdi-email zmdi-hc-fw`}/>
                    <Typography variant="subheading">
                        <IntlMessages id="profile.email" />
                    </Typography>
                    <ListItemText primary={user.email}/>

                </ListItem>

                <ListItem>
                    <i className={`${classes.iconList} zmdi zmdi-shield-security zmdi-hc-fw`}/>
                    <Typography variant="subheading">
                        <IntlMessages id="profile.license" />
                    </Typography>
                    <ListItemText primary={user.membership}/>
                </ListItem>

                <ListItem>
                    <i className={`${classes.iconList} zmdi zmdi-account-box zmdi-hc-fw`}/>
                    <Typography variant="subheading">
                        <IntlMessages id="profile.name" />
                    </Typography>
                    <ListItemText primary={user.name} />
                </ListItem>

                <ListItem>
                    <i className={`${classes.iconList} zmdi zmdi-account-box zmdi-hc-fw`}/>
                    <Typography variant="subheading">
                        <IntlMessages id="profile.lastName" />
                    </Typography>
                    <ListItemText primary={user.last_name} />
                </ListItem>

                <ListItem>
                    <i className={`${classes.iconList} zmdi zmdi-account-box-phone zmdi-hc-fw`}/>
                    <Typography variant="subheading">
                        <IntlMessages id="profile.phoneNumber" />
                    </Typography>
                    <ListItemText primary={user.phone_number} />
                </ListItem>

                <ListItem>
                    <i className={`${classes.iconList} zmdi zmdi-account-box zmdi-hc-fw`}/>
                    <Typography variant="subheading">
                        <IntlMessages id="profile.companyName" />
                    </Typography>
                    <ListItemText primary={user.company_name} />
                </ListItem>

                <ListItem>
                    <i className={`${classes.iconList} zmdi zmdi-account-box zmdi-hc-fw`}/>
                    <Typography variant="subheading">
                        <IntlMessages id="profile.billingAddress" />
                    </Typography>
                    <ListItemText primary={user.billing_address} />
                </ListItem>

                <ListItem>
                    <i className={`${classes.iconList} zmdi zmdi-account-box zmdi-hc-fw`}/>
                    <Typography variant="subheading">
                        <IntlMessages id="profile.taxId" />
                    </Typography>
                    <ListItemText primary={user.tax_id_number} />
                </ListItem>

            </List>

        </div>
    );
}

function mapStateToProps({user, settings}) {
  return {
      user,
      settings
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}



export default connect(mapStateToProps, mapDispatchToProps)(
      withStyles(styles)(SimpleList)
);