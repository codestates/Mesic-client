import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";

function EachFollow({ eachFollow, updateFollow }: any) {
  const state = useSelector((state: RootState) => state);
  const { user_id, token } = state.userReducer.user;

  const deleteFollow = () => {
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/users/follow/${user_id}`,
        {
          id: eachFollow._id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("delete follow : ", res);
        updateFollow();
      })
      .then((err) => console.log(err));
  };
  return (
    <div className="eachfollow" key={eachFollow.email}>
      <input type="checkbox" className="follow-checkbox"></input>
      <span>{eachFollow.name}</span>
      <br />
      <span>{eachFollow.email}</span>
      <button onClick={deleteFollow}>팔로우 취소</button>
    </div>
  );
}

export default EachFollow;
