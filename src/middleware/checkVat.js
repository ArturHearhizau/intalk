import { API_URL } from 'constants/ActionTypes';
import Cookie from '../util/cookie';

export default store => next => action => {
  const result = next(action);
  switch (action.type) {
    case 'CHECK_VAT':
      console.log('check vat', action);
      fetch(API_URL + '/api/addvat', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${Cookie.getCookie('access_token')}`
        },
        body: JSON.stringify({
          'numbers': action.numbers
        })
      }).then(res => {
        return res.json();
      }).then(res => {
        console.log(res, 'check_vat');
        store.dispatch({ type: 'ADD_VAT', result: res});
      });
      break;
    case 'TOGGLE_CHECK':
      fetch(API_URL + '/api/togglecheck', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${Cookie.getCookie('access_token')}`
        },
        body: JSON.stringify({
          'number': action.number
        })
      });
  }
  return result;
}