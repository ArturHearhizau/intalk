import {
    DARK_THEME,
    DRAWER_TYPE,
    FIXED_DRAWER,
    THEME_COLOR,
    TOGGLE_COLLAPSED_NAV,
    WINDOW_WIDTH,
    SWITCH_LANGUAGE
} from 'constants/ActionTypes';
import {DARK_INDIGO, BLUE} from 'constants/ThemeColors';
import Cookie from 'util/cookie';
import langInfo from '../languageProvider/data';

const initialSettings = {
    navCollapsed: false,
    drawerType: FIXED_DRAWER,
    themeColor: BLUE,
    darkTheme: false,
    width: $(window).width(),
    locale: langInfo[Cookie.getCookie('lang') || 'en']
};

const settings = (state = initialSettings, action) => {
    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            return {
                ...state,
                navCollapsed: false
            };
        case TOGGLE_COLLAPSED_NAV:
            return {
                ...state,
                navCollapsed: action.isNavCollapsed
            };
        case DRAWER_TYPE:
            return {
                ...state,
                drawerType: action.drawerType
            };
        case WINDOW_WIDTH:
            return {
                ...state,
                width: action.width
            };
        case THEME_COLOR:
            return {
                ...state,
                darkTheme: false,
                themeColor: action.color
            };
        case DARK_THEME:
            return {
                ...state,
                darkTheme: !state.darkTheme
            };
        case SWITCH_LANGUAGE:
            Cookie.setCookie('lang', action.payload.locale, {
                path: '/'
            });
            return {
                ...state,
                locale: action.payload,
                // isDirectionRTL: rltLocale.includes(action.payload.locale)

            };
        default:
            return state;
    }
};

export default settings;
