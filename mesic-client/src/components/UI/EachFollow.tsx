import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";

function EachFollow() {
  const state = useSelector((state: RootState) => state.modeReducer);

  return (
    <div className="eachfollow">
      <input type="checkbox" className="follow-checkbox"></input>
      <span>팔로우's 닉네임</span>
    </div>
  );
}

export default EachFollow;
