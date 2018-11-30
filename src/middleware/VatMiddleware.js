import { API_URL } from 'constants/ActionTypes';
import Cookie from '../util/cookie';

export default store => next => action => {
  const result= next(action);
  switch (action.type) {
    case 'LOAD_VAT':
      fetch(API_URL + '/api/getvat', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${Cookie.getCookie('access_token')}`
        }
      }).then(res => {
        return res.json();
      }).then(res => {
        // console.log(res, 'INIT_VAT');
        store.dispatch({ type: 'INIT_VAT', result: res});
      });
      break;
    case 'DELETE_VAT_NUMBER_REQUEST':
      fetch(API_URL + '/api/deleterecord', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${Cookie.getCookie('access_token')}`
        },
        body: JSON.stringify({
          number: action.number
        })
      }).then(res => {
        return res.json();
      }).then(res => {
        console.log(res, 'DELETE_VAT_NUMBER');
        store.dispatch({
          type: 'DELETE_VAT_NUMBER_RESPONSE',
          result: res,
          vatNumber: action.number
        });
      });
      break;
    case 'UPDATE_VAT_REQUEST':
      console.log(action.lastState, action.lastValue, action.editState, action.editValue);
      fetch(API_URL + '/api/updatevat', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${Cookie.getCookie('access_token')}`
        },
        body: JSON.stringify({
          lastState: action.lastState,
          lastValue: action.lastValue,
          editState: action.editState,
          editValue: action.editValue
        })
      }).then(res => {
        return res.json();
      }).then(res => {
        console.log(res, 'UPDATE_VAT_REQUEST');
        store.dispatch({
          type: 'UPDATE_VAT_RESPONSE',
          result: res,
          prevData: {
            lastState: action.lastState,
            lastValue: action.lastValue
          }
        });
      });
      break;
  }
  return result;
}