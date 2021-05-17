import React from "react";
import "./App.css";
import {useDispatch, useSelector} from "react-redux";
import {onOff} from "./actions/index";
import {RootState} from "./reducers";

function App() {
  const state = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const {show} = state;
  const handleClick = (e: any) => {
    dispatch(onOff(e.target.value));
  };
  return (
    <div className="App">
      <button id="button" onClick={handleClick} value={show}>
        {show}
      </button>
    </div>
  );
}

export default App;
