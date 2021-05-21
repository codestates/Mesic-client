import React, { useEffect, useState } from "react";
import Music from "./Music";
import Photo from "./Photo";
import Memo from "./Memo";
import { useDispatch, useSelector } from "react-redux";
import { switchMode } from "../../actions/index";
import { RootState } from "../../reducers";

type detailProps = {
  open: boolean;
};

function DetailModal(props: detailProps) {
  const [music, setMusic] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [uploadImg, setUploadImg] = useState(null);
  const [memo, setMemo] = useState("");

  const { open } = props;

  const dispatch = useDispatch();
  const { mode } = useSelector((state: RootState) => state.userReducer).user;

  const fileSelectedHandler = (e: any) => {
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
    setUploadImg(e.target.files[0]);
  };

  const memoHandler = (e: any) => {
    setMemo(e.target.value);
  };
  const musicHandler = (song: string) => {
    setMusic(song);
  };
  const resetMusic = () => {
    setMusic("");
  };

  return (
    <div className={`modal ${open ? "show1" : ""}`}>
      <Music
        music={music}
        musicHandler={musicHandler}
        resetMusic={resetMusic}
      />
      <Photo
        previewImg={previewImg}
        setPreviewImg={setPreviewImg}
        setUploadImg={setUploadImg}
        fileSelectedHandler={fileSelectedHandler}
      />
      <Memo memoHandler={memoHandler} />
      <div>
        <button
          className={`${mode !== "READ" ? "show" : "hide"}`}
          onClick={() => {
            dispatch(switchMode("READ"));
          }}
        >
          PIN IT
        </button>
      </div>
    </div>
  );
}

export default DetailModal;
