import {ON_OFF} from "../actions/index";
import {initialState} from "./initialState";
import {Action} from "../actions/index";

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ON_OFF:
      let res;
      if (action.payload.data === "off") {
        res = "on";
      } else {
        res = "off";
      }
      return Object.assign({}, state, {
        show: res,
      });
    default:
      return state;
  }
};

export default userReducer;
