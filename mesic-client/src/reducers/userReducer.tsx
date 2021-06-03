import {
  EDIT_USERINFO,
  GET_ACCESSTOKEN,
  REFRESH_FOLLOW,
  CLEAR_USER_INFO,
} from "../actions/index";
import { initialState } from "./initialState";
import { Action } from "../actions/index";
import defaultImage from "../../src/images/avatar.png";

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case EDIT_USERINFO:
      const { id, email, name, nickname, profileImg, follow } = action.payload;
      return Object.assign({}, state, {
        user: {
          ...state.user,
          isLogin: true,
          user_id: id,
          email,
          name,
          nickname,
          profileImg: profileImg.length > 0 ? profileImg : defaultImage,
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

    case CLEAR_USER_INFO:
      return Object.assign({}, state, {
        user: {
          ...state.user,
          token: "",
          isLogin: false,
          user_id: "",
          email: "",
          name: "",
          nickname: "",
          profileImg: "",
          follow: [],
        },
      });

    default:
      return state;
  }
};

export default userReducer;
