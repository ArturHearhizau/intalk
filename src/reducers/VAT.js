let counter =0;
function createData(valid, memberState, VATnum, name, adress, check_vat) {
  counter += 1;
  return {id: counter, valid, memberState, VATnum, name, adress , check: check_vat};
}

function updateData(data, { is_valid, vat_number, country_code, address, name, check_vat }) {
  data.valid = is_valid;
  data.VATnum = vat_number;
  data.memberState = country_code;
  data.adress = address;
  data.name = name;
  data.check = check_vat;
}

const INIT_STATE = [];


export default (state = INIT_STATE, action) => {
  let newState;
  switch (action.type) {
    case 'INIT_VAT':
      return action.result.map(value => {
        const {
          is_valid,
          vat_number,
          address,
          name,
          country_code,
          created_at,
          check_vat
        } = value;
        return createData(
          Boolean(Number(is_valid)),
          country_code,
          vat_number,
          name,
          address,
          Boolean(Number(check_vat))
        );
      });
    case 'ADD_VAT':
      let result = action.result.map(value => {
        const {
          is_valid,
          vat_number,
          address,
          name,
          country_code,
          created_at,
          check_vat
        } = value;
        return createData(
          Boolean(Number(is_valid)),
          country_code,
          vat_number,
          name,
          address,
          Boolean(Number(check_vat))
        );
      });

      return [
        ...result,
        ...state
      ];
    case 'DELETE_VAT_NUMBER_RESPONSE':
      newState = Object.assign([], state);
      if (action.result > 0) {
        let memberState = action.vatNumber.slice(0, 2);
        let vatNumber = action.vatNumber.slice(2);
        let index = newState.findIndex(value => {
          if(value.memberState === memberState
            && value.VATnum === vatNumber)
            return true;
        });
        if (index !== -1){
          newState.splice(index, 1);
          return newState;
        }
        return state;
      }
      return state;
    case 'UPDATE_VAT_RESPONSE':
      newState = Object.assign([], state);
      if(action.result.id !== undefined) {
        const { lastState, lastValue } = action.prevData;
        let value = newState.find(value => {
          if(value.memberState === lastState
            && value.VATnum === lastValue)
            return true;
        });
        updateData(value, action.result);
        return newState;
      }
      return state;
    default:
      return state;
  }
}