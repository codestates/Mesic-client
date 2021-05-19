import React, {useState} from "react";
import Music from "./Music";
import Photo from "./Photo";
import Memo from "./Memo";
import {useDispatch, useSelector} from "react-redux";
import {switchMode} from "../../actions/index";
import {RootState} from "../../reducers";

function DetailModal({open}: any) {
  const [music, setMusic] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [uploadImg, setUploadImg] = useState(null);
  const [memo, setMemo] = useState("");

  const dispatch = useDispatch();
  const {mode} = useSelector((state: RootState) => state.userReducer).user;

  const fileSelectedHandler = (e: any) => {
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
    setUploadImg(e.target.files[0]);
  };

  const memoHandler = (e: any) => {
    setMemo(e.target.value);
  };

  return (
    <div className={`modal ${open ? "show1" : ""}`}>
      <Music />
      <Photo  
        previewImg={previewImg}
        fileSelectedHandler={fileSelectedHandler}
      />
      <Memo memoHandler={memoHandler} />
      <button
        className={`${mode !== "READ" ? "show" : "hide"}`}
        onClick={() => {
          dispatch(switchMode("READ"));
        }}
      >
        PIN IT
      </button>
    </div>
  );
}

export default DetailModal;
