import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {switchMode} from "../../actions/index";
import {RootState} from "../../reducers";

function Photo({
  previewImg,
  fileSelectedHandler,
  setPreviewImg,
  setUploadImg,
}: any) {
  const dispatch = useDispatch();
  const imageInput = useRef<any>();
  const [showPhotoUpdate, setShowPhotoUpdate] = useState<boolean>(false);
  const {mode} = useSelector((state: RootState) => state.userReducer).user;

  // Photo 업데이트 버튼
  const handleFileChange = () => {
    if (imageInput.current?.value && mode === "READ") {
      setShowPhotoUpdate(true);
    } else {
      setShowPhotoUpdate(false);
    }
  };

  return (
    <div className="border">
      photo
      <button className={`${showPhotoUpdate ? "show" : "hide"}`}>UPDATE</button>
      <button
        className={`${showPhotoUpdate ? "show" : "hide"}`}
        onClick={() => {
          imageInput.current.value = "";
          setPreviewImg("");
          setUploadImg(null);
        }}
      >
        RESET
      </button>
      <input
        ref={imageInput}
        type="file"
        accept="image/*"
        onChange={(e) => {
          console.log(mode);
          fileSelectedHandler(e);
          handleFileChange();
        }}
      />
      <img className="img" src={previewImg} />
    </div>
  );
}

export default Photo;
