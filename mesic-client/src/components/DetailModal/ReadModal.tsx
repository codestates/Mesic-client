import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import ReadMusic from "./ReadMusic";
import ReadPhoto from "./ReadPhoto";
import ReadMemo from "./ReadMemo";
//import { read } from "fs";

function ReadModal({ readMarkerData, setPinUpdate, deleteMyMarker }: any) {
  const state = useSelector((state: RootState) => state);
  const { isLogin } = state.userReducer.user;
  const { mode } = state.modeReducer.user;
  console.log(readMarkerData);
  const { video_Id, title, thumbnail } = readMarkerData.music;
  const { photo, memo, _id } = readMarkerData;
  const [readMusic, setReadMusic] = useState<any>({
    video_Id: video_Id,
    title: title,
    thumbnail: thumbnail,
  });
  const [readImg, setReadImg] = useState<any>(photo);
  const [readMemo, setReadMemo] = useState<string>(memo);

  return (
    <div className="modal-outsider show1">
      <div className="modal">
        <ReadMusic
          readMusic={readMusic}
          setReadMusic={setReadMusic}
          markerId={_id}
          setPinUpdate={setPinUpdate}
        />
        <ReadPhoto
          readImg={readImg}
          setReadImg={setReadImg}
          markerId={_id}
          setPinUpdate={setPinUpdate}
        />
        <ReadMemo
          readMemo={readMemo}
          setReadMemo={setReadMemo}
          markerId={_id}
          setPinUpdate={setPinUpdate}
        />
        {isLogin && mode === "READ" ? (
          <button onClick={() => deleteMyMarker(readMarkerData._id)}>
            삭제
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ReadModal;
