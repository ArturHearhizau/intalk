import { API_URL } from 'constants/ActionTypes';
import Cookie from '../util/cookie';

export default store => next => action => {
  const result = next(action);

  switch (action.type) {
    case 'GET_ADMIN_STAT_REQUEST':
      fetch(API_URL + '/api/getstat', {
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
        console.log(res, 'GET_ADMIN_STAT_RESPONSE');
        store.dispatch({ type: 'GET_ADMIN_STAT_RESPONSE', result: res});
      });
      break;
  }

  return result;
}