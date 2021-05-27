import {
  EDIT_USERINFO,
  GET_ACCESSTOKEN,
  REFRESH_FOLLOW,
} from "../actions/index";
import { EDIT_USERINFO, GET_ACCESSTOKEN, LOGOUT } from "../actions/index";
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

    case REFRESH_FOLLOW:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          follow: action.payload.follow,
        },
      });

    case LOGOUT:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          token: "",
          isLogin: false,
          user_id: "",
          email: "",
          name: "",
          nickname: "",
          profileImg:
            "",
          follow: [],
        },
      });
    default:
      return state;
  }
};

export default userReducer;
