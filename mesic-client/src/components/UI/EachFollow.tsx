import axios from "axios";
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import {
  addCheckedFollow,
  deleteCheckedFollow,
  iterateMarkers,
} from "../../actions";

function EachFollow({ eachFollow, updateFollow }: any) {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { user_id, token } = state.userReducer.user;
  const { checkedFollow }: any = state.modeReducer;
  const followCheckbox = useRef<any>();

  const deleteFollow = () => {
    if (followCheckbox.current.checked) {
      followCheckbox.current.checked = false;
      dispatch(deleteCheckedFollow(eachFollow._id));
    }
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
      .catch((err) => console.log(err));
  };

  const checkBoxHandler = () => {
    if (followCheckbox.current.checked) {
      dispatch(iterateMarkers());
      dispatch(addCheckedFollow(eachFollow._id));
    } else {
      dispatch(deleteCheckedFollow(eachFollow._id));
    }
  };

  const checkedChecker = () => {
    for (let i = 0; i < checkedFollow.length; i += 1) {
      if (checkedFollow[i].user_id === eachFollow._id) {
        return true;
      }
    }
  };

  return (
    <div className="eachfollow" key={eachFollow.email}>
      {checkedChecker() ? (
        <>
          <input
            ref={followCheckbox}
            type="checkbox"
            className="follow-checkbox"
            onClick={checkBoxHandler}
            checked={true}
          ></input>
          <span>{eachFollow.name}</span>
          <img
            className="my-pin-color"
            src={`images/FollowMarker/${eachFollow.marker}`}
          />
          <br />
          <span>{eachFollow.email}</span>
          <button onClick={deleteFollow}>팔로우 취소</button>
        </>
      ) : (
        <>
          <input
            ref={followCheckbox}
            type="checkbox"
            className="follow-checkbox"
            onClick={checkBoxHandler}
            checked={false}
          ></input>
          <span>{eachFollow.name}</span>
          <br />
          <span>{eachFollow.email}</span>
          <button onClick={deleteFollow}>팔로우 취소</button>
        </>
      )}
    </div>
  );
}

export default EachFollow;
