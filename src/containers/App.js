import React, {Component} from 'react';
import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl';
import AppLocale from '../languageProvider';
import MainApp from 'app/index';
import 'react-big-calendar/lib/less/styles.less';
import 'styles/bootstrap.scss'
import 'styles/app.scss';
import indigoTheme from './themes/indigoTheme';
import cyanTheme from './themes/cyanTheme';
import orangeTheme from './themes/orangeTheme';
import amberTheme from './themes/amberTheme';
import pinkTheme from './themes/pinkTheme';
import blueTheme from './themes/blueTheme';
import purpleTheme from './themes/purpleTheme';
import greenTheme from './themes/greenTheme';
import darkTheme from './themes/darkTheme';
import {
    AMBER,
    BLUE,
    CYAN,
    DARK_AMBER,
    DARK_BLUE,
    DARK_CYAN,
    DARK_DEEP_ORANGE,
    DARK_DEEP_PURPLE,
    DARK_GREEN,
    DARK_INDIGO,
    DARK_PINK,
    DEEP_ORANGE,
    DEEP_PURPLE,
    GREEN,
    INDIGO,
    PINK
} from 'constants/ThemeColors';


class App extends Component {

    componentWillMount() {
        this.props.initUser();
    }

    getColorTheme(themeColor, applyTheme) {
        switch (themeColor) {
            case INDIGO: {
                applyTheme = createMuiTheme(indigoTheme);
                break;
            }
            case CYAN: {
                applyTheme = createMuiTheme(cyanTheme);
                break;
            }
            case AMBER: {
                applyTheme = createMuiTheme(amberTheme);
                break;
            }
            case DEEP_ORANGE: {
                applyTheme = createMuiTheme(orangeTheme);
                break;
            }
            case PINK: {
                applyTheme = createMuiTheme(pinkTheme);
                break;
            }
            case BLUE: {
                applyTheme = createMuiTheme(blueTheme);
                break;
            }
            case DEEP_PURPLE: {
                applyTheme = createMuiTheme(purpleTheme);
                break;
            }
            case GREEN: {
                applyTheme = createMuiTheme(greenTheme);
                break;
            }
            case DARK_INDIGO: {
                applyTheme = createMuiTheme(indigoTheme);
                break;
            }
            case DARK_CYAN: {
                applyTheme = createMuiTheme(cyanTheme);
                break;
            }
            case DARK_AMBER: {
                applyTheme = createMuiTheme(amberTheme);
                break;
            }
            case DARK_DEEP_ORANGE: {
                applyTheme = createMuiTheme(orangeTheme);
                break;
            }
            case DARK_PINK: {
                applyTheme = createMuiTheme(pinkTheme);
                break;
            }
            case DARK_BLUE: {
                applyTheme = createMuiTheme(blueTheme);
                break;
            }
            case DARK_DEEP_PURPLE: {
                applyTheme = createMuiTheme(purpleTheme);
                break;
            }
            case DARK_GREEN: {
                applyTheme = createMuiTheme(greenTheme);
                break;
            }
        }
        return applyTheme;
    }

    render() {
        const {match, location, themeColor, isDarkTheme, user, locale} = this.props;
        console.log(themeColor, 'user app');
        // let applyTheme = createMuiTheme(indigoTheme);
        let applyTheme = this.getColorTheme('green', createMuiTheme(greenTheme));
        if (isDarkTheme) {
            applyTheme = createMuiTheme(darkTheme)
        } else {
            applyTheme = this.getColorTheme(themeColor, applyTheme);
        }
        if (location.pathname === '/') {
            return ( <Redirect to={'/app/vat'}/> );
        }
        if (user.isAuth === false && location.pathname !== '/app/extra-pages/error-401') {
            return ( <Redirect to={'/app/extra-pages/error-401'}/> );
        }

        const currentAppLocale = AppLocale[locale.locale];
        console.log(currentAppLocale, 'currentAppLocale');
        console.log(locale, 'locale');
        console.log(AppLocale, 'AppLocale');
        return (
            <MuiThemeProvider theme={applyTheme}>
                <IntlProvider
                    textComponent={React.Fragment}
                    locale={currentAppLocale.locale}
                    messages={currentAppLocale.messages}
                >
                    <div className="app-main">
                        <Route path={`${match.url}app`} component={MainApp}/>
                    </div>
                </IntlProvider>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({settings, user}) => {
    const {themeColor, sideNavColor, darkTheme, locale} = settings;
    return {themeColor, sideNavColor, isDarkTheme: darkTheme, user, locale}
};

const mapDispatchToProps = (dispatch) => {
    return {
      initUser() {
        dispatch({ type: 'GET_USER_REQUEST' });
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


