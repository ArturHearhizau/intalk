let counter =0;
function createData(valid, memberState, VATnum, name, adress) {
  counter += 1;
  return {id: counter, valid, memberState, VATnum, name, adress};
}

let VAT_DATA = new Map();

const data = [];

VAT_DATA.set((new Date('2018-02-26')).toString(), data);

const INIT_STATE = [];

export default (state = {}, action) => {
  switch (action.type) {
    case 'INIT_VAT_HISTORY':
      console.log(action.result);
      return action.result;
    case 'GET_INFO':
      return state;
    case 'GET_DATA':
      let newState = Object.assign([], state);
      newState[0].vatData = VAT_DATA.get(action.date.toString())
      return newState;
    case 'DOWNLOAD_CSV':
      return state;
    default:
      return state;
  }
}