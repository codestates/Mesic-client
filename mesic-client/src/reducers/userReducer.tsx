import {SWITCH_MODE} from "../actions/index";
import {initialState} from "./initialState";
import {Action} from "../actions/index";

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SWITCH_MODE:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          mode: action.payload.data,
        },
      });
    default:
      return state;
  }
};

export default userReducer;
