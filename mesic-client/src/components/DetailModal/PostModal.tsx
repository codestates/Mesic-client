import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { switchMode } from "../../actions/index";
import PostMusic from "./PostMusic";
import PostPhoto from "./PostPhoto";
import PostMemo from "./PostMemo";
import axios from "axios";
//import { read } from "fs";

function PostModal({ postLatLng }: any) {
  const [postMusic, setPostMusic] = useState<{
    video_Id: string;
    title: string;
    thumbnail: string;
  }>({
    video_Id: "",
    title: "",
    thumbnail: "",
  });
  const [postImg, setPostImg] = useState<any>("");
  const [postMemo, setPostMemo] = useState<string>("");

  const state = useSelector((state: RootState) => state.modeReducer);
  const dispatch = useDispatch();
  const { user_id, token } = state.user;


  const postPinData = async () => {
    console.log("sending : ", {
      user_id,
      location: {
        latitude: postLatLng[1],
        logitude: postLatLng[0],
      },
      music: postMusic,
      photo: postImg,
      memo: postMemo,
    });
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/pins`,
        {
          user_id,
          location: {
            latitude: postLatLng[1],
            longitude: postLatLng[0],
          },
          music: postMusic,
          photo: postImg,
          memo: postMemo,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(switchMode("CREATED"));
      })
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
