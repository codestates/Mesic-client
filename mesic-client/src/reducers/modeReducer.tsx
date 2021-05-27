import {
  SWITCH_MODE,
  ADD_CHECKED_FOLLOW,
  DELETE_CHECKED_FOLLOW,
} from "../actions/index";
import { initialState } from "./initialState";
import { Action } from "../actions/index";

const modeReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SWITCH_MODE:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          mode: action.payload.data,
        },
      });
    case ADD_CHECKED_FOLLOW:
      return Object.assign({}, state, {
        ...state,
        checkedFollow: [...state.checkedFollow, action.payload.user_id],
      });
    case DELETE_CHECKED_FOLLOW:
      return Object.assign({}, state, {
        ...state,
        checkedFollow: state.checkedFollow.filter(
          (el) => el !== action.payload.user_id
        ),
      });
    default:
      return state;
  }
};

export default modeReducer;
