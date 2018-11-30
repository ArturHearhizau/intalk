const INIT_STATE = {
    created_at: '1970-01-01',
    isAuth: true
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'GET_USER_RESPONSE':
      let isAuth = false;
      if(action.result.error !== 'Unauthenticated.')
        isAuth = true;
      return {
        isAuth,
        ...action.result
      };
    case 'SEND_BASIC_DATA_RESPONSE':
      return {
        ...state,
        ...action.result
      };
    default:
      return state;
  }
}