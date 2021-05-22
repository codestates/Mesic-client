import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchMode } from "../../actions/index";
import { RootState } from "../../reducers";
import ConfirmModal from "../UI/ConfirmModal";

// type PostPhotoProps = {
//   postImg: any;
//   setPostImg: (state: any) => void;
// };

function PostPhoto({ postImg, setPostImg, setReadImg }: any) {
  const dispatch = useDispatch();
  const imageInput = useRef<any>();
  const { mode } = useSelector((state: RootState) => state.userReducer).user;

  // Photo 업데이트 버튼
  const handlePostImg = (e: any) => {
    setPostImg(URL.createObjectURL(e.target.files[0]));
    imageInput.current.value = "";
  };

  return (
    <>
      <div className="border">
        photo
        <input
          ref={imageInput}
          type="file"
          accept="image/*"
          onChange={handlePostImg}
        />
        <img className="img" src={postImg} />
      </div>
    </>
  );
}

export default PostPhoto;
