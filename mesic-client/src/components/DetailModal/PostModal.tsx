import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import PostMusic from "./PostMusic";
import PostPhoto from "./PostPhoto";
import PostMemo from "./PostMemo";
import axios from "axios";
//import { read } from "fs";

function PostModal({ postLatLng }: any) {
  const [postMusic, setPostMusic] = useState<any>(null);
  const [postImg, setPostImg] = useState<any>("");
  const [postMemo, setPostMemo] = useState<string>("");

  const state = useSelector((state: RootState) => state.modeReducer);
  const { user_id } = state.user;

  const postPinData = async () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/pins/users/%${user_id}`, {
        user_id,
        location: {
          latitude: postLatLng[1],
          logitude: postLatLng[0],
        },
        music: postMusic,
        photo: postImg,
        memo: postMemo,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="modal show1">
      <PostMusic postMusic={postMusic} setPostMusic={setPostMusic} />
      <PostPhoto postImg={postImg} setPostImg={setPostImg} />
      <PostMemo postMemo={postMemo} setPostMemo={setPostMemo} />
      <div>
        <button onClick={postPinData}>PIN IT</button>
      </div>
    </div>
  );
}

export default PostModal;
