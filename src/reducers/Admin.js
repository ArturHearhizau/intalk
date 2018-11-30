export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_ADMIN_STAT_RESPONSE':
      return action.result;
    default:
      return state;
  }
}