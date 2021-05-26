import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import modeReducer from "./modeReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  modeReducer,
  userReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
