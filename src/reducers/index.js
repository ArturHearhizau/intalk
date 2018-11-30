import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import Settings from './Settings';
import VATData from './VAT';
import VAThistory from './VAThistory';
import VATSearch from './VATSearch';
import User from './User';
import Admin from './Admin';

const reducers = combineReducers({
    routing: routerReducer,
    settings: Settings,
    vatData: VATData,
    vatHistory: VAThistory,
    vatSearch: VATSearch,
    user: User,
    admin: Admin
});

export default reducers;
