import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";

function EachFollow({ eachFollow }: any) {
  const { nickname } = eachFollow;

  return (
    <div className="eachfollow">
      <input type="checkbox" className="follow-checkbox"></input>
      <span>{nickname}</span>
      <button>팔로우 취소</button>
    </div>
  );
}

export default EachFollow;
