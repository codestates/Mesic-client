import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { switchMode } from "../../actions/index";
import PostMusic from "./PostMusic";
import PostPhoto from "./PostPhoto";
import PostMemo from "./PostMemo";
import axios from "axios";
import AWS from "aws-sdk";

function PostModal({ postLatLng, setOpenPostModal, deletePostMarkers }: any) {
  const [postMusic, setPostMusic] = useState<{
    video_Id: string;
    title: string;
    thumbnail: string;
  }>({
    video_Id: "",
    title: "",
    thumbnail: "",
  });
  const location = `https://${process.env.REACT_APP_AWS_S3_BUCKET}.s3.${process.env.REACT_APP_AWS_S3_REGION}.amazonaws.com/image/undefined`;
  const [postImg, setPostImg] = useState<any>(location);
  const [postMemo, setPostMemo] = useState<string>("");
  const [errMessage, setErrMessage] = useState<string>("");

  const state = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const { user_id, token } = state.user;

  const postPinData = async () => {
    if (
      postMusic.title.length === 0 &&
      postMemo.length === 0 &&
      postImg === location
    ) {
      setErrMessage("내용을 입력해주세요.");
      return;
    }
    setErrMessage("");

    const accessKeyId = process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID;
    const secretAccessKey = process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY_ID;
    const region = process.env.REACT_APP_AWS_S3_REGION;

    const s3 = new AWS.S3({ accessKeyId, secretAccessKey, region }); //s3 configuration

    const param = {
      Bucket: `${process.env.REACT_APP_AWS_S3_BUCKET}`,
      Key: `image/${postImg.name}`,
      ACL: "public-read",
      Body: postImg,
      ContentType: "image/jpg",
    }; //s3 업로드에 필요한 옵션 설정

    s3.upload(param, function (err: any, data: any) {
      if (err) {
        console.log(err);
        return;
      }

      const postData = {
        user_id,
        location: {
          latitude: postLatLng[1],
          longitude: postLatLng[0],
        },
        music: postMusic,
        photo: data.Location,
        memo: postMemo,
      };

      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/pins`, postData, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          dispatch(switchMode("CREATED"));
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <div className="modal-outsider show1">
      <div className="modal">
        <div
          className="modal-close-btn"
          onClick={() => {
            setOpenPostModal(false);
            deletePostMarkers();
          }}
        >
          X
        </div>
        <PostMusic postMusic={postMusic} setPostMusic={setPostMusic} />
        <PostPhoto postImg={postImg} setPostImg={setPostImg} />
        <PostMemo postMemo={postMemo} setPostMemo={setPostMemo} />
        <div className="err-massage">
          <div>{errMessage}</div>
        </div>
      </div>
      <button className="pinit-btn" onClick={postPinData}>
        PIN IT
      </button>
    </div>
  );
}

export default PostModal;
