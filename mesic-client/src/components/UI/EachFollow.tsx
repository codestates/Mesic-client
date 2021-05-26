import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";

function EachFollow({ eachFollow }: any) {
  const { nickname } = eachFollow;

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
      .then((res) => console.log(res))
      .then((err) => console.log(err));
  };
  return (
    <div className="eachfollow">
      <input type="checkbox" className="follow-checkbox"></input>
      <span>{eachFollow.name}</span>
      <br />
      <span>{eachFollow.email}</span>
      <button onClick={deleteFollow}>팔로우 취소</button>
    </div>
  );
}

export default EachFollow;
