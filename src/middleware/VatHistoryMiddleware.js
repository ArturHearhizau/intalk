import { API_URL } from 'constants/ActionTypes';
import Cookie from '../util/cookie';

export default store => next => action => {
  const result = next(action);
  // debugger;
  switch (action.type) {
    case 'LOAD_VAT_HISTORY':
      fetch(API_URL + '/api/getvathistory', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${Cookie.getCookie('access_token')}`
        },
        body: JSON.stringify({
          'date': '2018-02-27'
        })
      }).then(res => {
        // console.log(res, 'LOAD_VAT_HISTORY')
        return res.json();
      }).then(res => {
        // console.log(res, 'LOAD_VAT_HISTORY');
        store.dispatch({ type: 'INIT_VAT_HISTORY', result: res});
      });
      break;
    case 'SEARCH_BY_TIME_REQUEST':
      fetch(API_URL + '/api/searchbytime', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${Cookie.getCookie('access_token')}`
        },
        body: JSON.stringify({
          'date': action.date
        })
      }).then(res => {
        return res.json();
      }).then(res => {
        console.log(res, 'SEARCH_BY_TIME_RESPONSE');
        store.dispatch({ type: 'SEARCH_BY_TIME_RESPONSE', result: res});
      });
      break;
    case 'SEND_CSV':
      fetch(API_URL + '/api/sendcsv', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${Cookie.getCookie('access_token')}`
        },
        body: JSON.stringify({
          'csv': action.data,
          'email': action.email
        })
      });
  }
  return result;
}