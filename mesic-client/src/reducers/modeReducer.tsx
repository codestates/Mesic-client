import {
  SWITCH_MODE,
  ADD_CHECKED_FOLLOW,
  DELETE_CHECKED_FOLLOW,
  CLEAR_CHECKED_REMOVE,
  CLEAR_MODE_STATE,
  ITERATE_MARKERS,
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
        checkAdded: action.payload.user_id,
        checkedFollow: [
          ...state.checkedFollow,
          {
            user_id: action.payload.user_id,
            marker: [
              state.markerSet[state.currentMarker][0],
              state.markerSet[state.currentMarker][1],
            ],
          },
        ],
      });
    case ITERATE_MARKERS:
      return Object.assign({}, state, {
        currentMarker: (state.currentMarker + 1) % 6,
      });
    case DELETE_CHECKED_FOLLOW:
      return Object.assign({}, state, {
        ...state,
        checkRemoved: action.payload.user_id,
        checkedFollow: state.checkedFollow.filter(
          (el: any) => el.user_id !== action.payload.user_id
        ),
      });
    case CLEAR_CHECKED_REMOVE:
      return Object.assign({}, state, {
        ...state,
        checkRemoved: "",
      });
      case CLEAR_MODE_STATE:
      return Object.assign({}, state, {
        ...state,
        checkRemoved: "",
        checkAdded: "",
        checkedFollow: [],
        currentMarker: 0,
      });

    default:
      return state;
  }
};

export default modeReducer;
