import {DARK_THEME, DRAWER_TYPE, THEME_COLOR, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH, SWITCH_LANGUAGE} from 'constants/ActionTypes';

export function toggleCollapsedNav(isNavCollapsed) {
    return {type: TOGGLE_COLLAPSED_NAV, isNavCollapsed};
}

export function setDrawerType(drawerType) {
    return {type: DRAWER_TYPE, drawerType};
}

export function updateWindowWidth(width) {
    return {type: WINDOW_WIDTH, width};
}

export function setThemeColor(color) {
    return {type: THEME_COLOR, color};
}

export function setDarkTheme() {
    return {type: DARK_THEME};
}

export function switchLanguage(locale) {
  return {
    type: SWITCH_LANGUAGE,
    payload: locale
  };
}
