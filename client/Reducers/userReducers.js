
import * as types from '../Constants/actionTypes';


const initialState = {
  username: '',
  password: '',
  role: '',
  apt: '',
  userId: '',
  aptId: '',
  login: false,
  aptList: ['1', '2', '3', '4', '5']
};

const userReducers = (state = initialState, action) => {
  let events;

  switch(action.type) {
    case 'UPDATE_ID': 
      return {
        ...state,
        userId: action.payload
      }

    case types.UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload,
      }

    case types.UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      }
    
    case types.UPDATE_LOGIN:
      return {
        ...state,
        userId: action.payload.userId,
        aptId: action.payload.aptId,
        password: '',
        role: action.payload.role,
        login: true,
      }
    
    case types.UPDATE_ROLE:
      return {
        ...state,
        role: action.payload,
      }

    case types.UPDATE_APT:
        return {
          ...state,
          apt: action.payload,
          aptId: action.payload,
        }

    default:
      return state;
  }
}
export default userReducers;