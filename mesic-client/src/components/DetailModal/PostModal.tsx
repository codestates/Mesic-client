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
  const [errMessage, setErrMessage] = useState<string>("");

  const state = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const { user_id, token } = state.user;

  const postPinData = async () => {
    const data = {
      user_id,
      location: {
        latitude: postLatLng[1],
        longitude: postLatLng[0],
      },
      music: postMusic,
      photo: postImg,
      memo: postMemo,
    };
    console.log("sending : ", data);
    if (
      postMusic.title.length === 0 &&
      postMemo.length === 0 &&
      postImg.length === 0
    ) {
      setErrMessage("내용을 입력해주세요");
      return;
    }
    setErrMessage("");
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/pins`, data, {
        headers: { authorization: `Bearer ${token}` },
      })
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
        <div>{errMessage}</div>
        <button onClick={postPinData}>PIN IT</button>
      </div>
    </div>
  );
}

export default PostModal;
