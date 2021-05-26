import { EDIT_USERINFO, GET_ACCESSTOKEN } from "../actions/index";
import { initialState } from "./initialState";
import { Action } from "../actions/index";

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case EDIT_USERINFO:
      const { id, email, name, nickname, follow } = action.payload;
      return Object.assign({}, state, {
        user: {
          ...state.user,
          isLogin: true,
          user_id: id,
          email,
          name,
          nickname,
          follow,
        },
      });
    case GET_ACCESSTOKEN:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          token: action.payload.token,
        },
      });
    default:
      return state;
  }
};

export default userReducer;
