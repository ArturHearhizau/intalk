import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {Link} from 'react-router-dom';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import {Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';
import {COLLAPSED_DRAWER, FIXED_DRAWER} from 'constants/ActionTypes';
import {switchLanguage} from 'actions/Setting';
import IntlMessages from 'util/IntlMessages';
import LanguageSwitcher from 'components/LanguageSwitcher/index';

class Header extends React.Component {

  onAppNotificationSelect = () => {
    this.setState({
      appNotification: !this.state.appNotification
    })
  };
  onMailNotificationSelect = () => {
    this.setState({
      mailNotification: !this.state.mailNotification
    })
  };
  onLangSwitcherSelect = (event) => {
    this.setState({
      langSwitcher: !this.state.langSwitcher, anchorEl: event.currentTarget
    })
  };
  onSearchBoxSelect = () => {
    this.setState({
      searchBox: !this.state.searchBox
    })
  };
  handleRequestClose = () => {
    this.setState({langSwitcher: false, mailNotification: false, appNotification: false, searchBox: false});
  };

  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      searchBox: false,
      searchText: '',
      mailNotification: false,
      langSwitcher: false,
      appNotification: false,
    }
  }

  updateSearchText(evt) {
    this.setState({
      searchText: evt.target.value,
    });
  }

  render() {
    const {onToggleCollapsedNav, drawerType, locale} = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-block d-xl-none' : drawerType.includes(COLLAPSED_DRAWER) ? 'd-block' : 'd-none';

    return (
      <AppBar className="app-main-header">
          <Toolbar className="app-toolbar" disableGutters={false}>
              <IconButton className={`jr-menu-icon ${drawerStyle}`} aria-label="Menu"
                          onClick={onToggleCollapsedNav}>
                  <span className="menu-icon"/>
              </IconButton>

              <a class="app-logo" href="https://vies.ninja">
                  <img src="https://vies.ninja/images/logo.png" alt="Jambo" title="Jambo"/>
              </a>


              {/*<SearchBox styleName="d-none d-sm-block" placeholder=""*/}
                         {/*onChange={this.updateSearchText.bind(this)}*/}
                         {/*value={this.state.searchText}/>*/}
              <ul className="header-notifications list-inline ml-auto">
                  <li className="list-inline-item">
                      <Dropdown
                        className="quick-menu"
                        isOpen={this.state.langSwitcher}
                        toggle={this.onLangSwitcherSelect.bind(this)}>

                          <DropdownToggle
                            className="d-inline-block"
                            tag="span"
                            data-toggle="dropdown">
                              <div className="d-flex align-items-center pointer">
                                  <i className={`flag flag-32 flag-${locale.icon}`}/>
                                  <h4 className="mb-0 ml-1 d-none d-md-block">{locale.name}</h4>
                              </div>
                          </DropdownToggle>

                          <DropdownMenu right className="w-50">
                              <LanguageSwitcher switchLanguage={this.props.switchLanguage}/>
                          </DropdownMenu>
                      </Dropdown>
                  </li>
              </ul>
          </Toolbar>
      </AppBar>
    );
  }

}

const mapStateToProps = ({settings}) => {
  const {locale} = settings;
  return {locale}
};

export default connect(mapStateToProps, {switchLanguage})(Header);