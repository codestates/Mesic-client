import React, {useState} from "react";
import Music from "./Music";
import Photo from "./Photo";
import Memo from "./Memo";

function DetailModal({open}: any) {
  const [music, setMusic] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [uploadImg, setUploadImg] = useState(null);
  const [memo, setMemo] = useState("");

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
      <button>PIN IT</button>
    </div>
  );
}

export default DetailModal;
