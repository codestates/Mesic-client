import axios from "axios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import {
  addCheckedFollow,
  deleteCheckedFollow,
  iterateMarkers,
} from "../../actions";
import { EachFollowProps } from "../../props-types";

function EachFollow({ eachFollow, updateFollow }: EachFollowProps) {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { user_id, token } = state.userReducer.user;
  const { checkedFollow }: any = state.modeReducer;
  const followCheckbox = useRef<HTMLInputElement>(null);

  const deleteFollow = () => {
    if (followCheckbox.current?.checked) {
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
      .then(() => {
        updateFollow();
      })
      .catch((err) => console.log(err));
  };

  const checkBoxHandler = () => {
    if (followCheckbox.current?.checked) {
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
    <div className="each-follow" key={eachFollow.email}>
      <div className="each-follow-flex">
        <input
          ref={followCheckbox}
          type="checkbox"
          onClick={checkBoxHandler}
          checked={checkedChecker() ? true : false}
        ></input>
        <div className={checkedChecker() && "each-follow-info"}>
          <span className="each-user-name">{eachFollow.name}</span>
          <br />
          <span className="each-user-email">{eachFollow.email}</span>
        </div>
        {checkedChecker() && (
          <img
            className="my-pin-color"
            src={`images/FollowMarker/${eachFollow.marker}`}
          />
        )}
        <button className="delete-follow-btn" onClick={deleteFollow}>
          -
        </button>
      </div>
    </div>
  );
}

export default EachFollow;
