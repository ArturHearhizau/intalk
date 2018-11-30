export default (state = {}, action) => {
  switch (action.type) {
    case 'SEARCH_BY_TIME_RESPONSE':
      debugger;
      return {
        ...action.result,
        ...state
      };
    default:
      return state;
  }
}