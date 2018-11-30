import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Button from 'material-ui/Button';
import 'jquery-slimscroll/jquery.slimscroll.min';
import HelpOutline from 'material-ui-icons/HelpOutline';
import {connect} from 'react-redux';
import IntlMessages from 'util/IntlMessages';


class SideNavContent extends Component {
    componentDidMount() {
        const {history} = this.props;
        const $nav = $(this.nav);
        const slideDuration = 250;

        $nav.slimscroll({
            height: '100%'
        });

        const pathname = `#${history.location.pathname}`;// get current path

        $('ul.nav-menu > li.menu').click(function () {
            const menuLi = this;
            $('ul.nav-menu > li.menu').not(menuLi).removeClass('open');
            $('ul.nav-menu > li.menu ul').not($('ul', menuLi)).slideUp(slideDuration);
            $('> ul', menuLi).slideToggle(slideDuration);
            $(menuLi).toggleClass('open');
        });

        $('ul.sub-menu li').click(function (e) {
            let superSubMenu = $(this).parent();
            if (superSubMenu.parent().hasClass('active')) {
                $('li', superSubMenu).not($(this)).removeClass('active');
            }
            else {
                $('ul.sub-menu li').not($(this)).removeClass('active');
            }

            $(this).toggleClass('active');
            e.stopPropagation();
        });

        const activeLi = $('a[to="' + pathname + '"]');// select current a element
        const activeNav = activeLi.closest('ul'); // select closest ul
        if (activeNav.hasClass('sub-menu')) {
            activeNav.slideDown(slideDuration);
            activeNav.parent().addClass('open');
            activeLi.parent().addClass('active');
        } else {
            activeLi.parent().addClass('open');
        }
    }

    render() {
        console.log('lol');

        return (
            <ul className="nav-menu" ref={(c) => {
                this.nav = c;
            }}>

                <li className="nav-header">
                    <IntlMessages id='sidebar.main' />
                </li>
                {this.props.user.role === 'admin'
                    ? <li className="menu no-arrow">
                        <Link to="/app/admin">
                            <i className="zmdi zmdi-accounts-alt zmdi-hc-fw"/>
                            <span className="nav-text">
                                <IntlMessages id='sidebar.adminPanel' />
                            </span>
                        </Link>
                    </li>
                  : null
                }
                <li className="menu no-arrow">
                    <Link to="/app/vat">
                        <i className="zmdi zmdi-trending-up zmdi-hc-fw"/>
                        <span className="nav-text">
                            <IntlMessages id='sidebar.vat' />
                        </span>
                    </Link>
                </li>

                <li className="menu no-arrow">
                    <Link to="/app/vathistory">
                        <i className="zmdi zmdi-storage zmdi-hc-fw"/>
                        <span className="nav-text">
                            <IntlMessages id='sidebar.vatHistory' />
                        </span>
                    </Link>
                </li>

                <li className="menu no-arrow">
                    <Link to="/app/profile">
                        <i className="zmdi zmdi-account-circle zmdi-hc-fw"></i>
                        <span className="nav-text">
                            <IntlMessages id='sidebar.profile' />
                        </span>
                    </Link>
                </li>

                <li className="menu no-arrow">
                    <Link to="/app/logout">
                        <i className="zmdi zmdi-sign-in zmdi-hc-fw"></i>
                        <span className="nav-text">
                            <IntlMessages id='sidebar.logout' />
                        </span>
                    </Link>
                </li>

            </ul>
        );
    }
}
function mapStateToProps({user, settings}) {
  let { locale } = settings;
  return {
      user,
      locale
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter(SideNavContent)
);
