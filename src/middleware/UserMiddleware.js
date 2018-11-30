import { API_URL } from 'constants/ActionTypes';
import Cookie from '../util/cookie';

export default store => next => action => {
  const result = next(action);
  switch (action.type) {
    case 'GET_USER_REQUEST':
      fetch(API_URL + '/api/user', {
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
        console.log(res, 'GET_USER_RESPONSE1');
        store.dispatch({ type: 'GET_USER_RESPONSE', result: res});
      });
      break;
    case 'SEND_BASIC_DATA':
      fetch(API_URL + '/api/updateuser', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': `Bearer ${Cookie.getCookie('access_token')}`
        },
        body: JSON.stringify({
          lastName: action.lastName,
          name: action.name,
          phoneNumber: action.phoneNumber
        })
      }).then(res => {
        return res.json();
      }).then(res => {
        store.dispatch({ type: 'SEND_BASIC_DATA_RESPONSE', result: res});
      });
      break;
  }
  return result;
}