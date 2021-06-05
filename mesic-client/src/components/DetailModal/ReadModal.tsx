import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import ReadMusic from "./ReadMusic";
import ReadPhoto from "./ReadPhoto";
import ReadMemo from "./ReadMemo";
import ConfirmModal from "../UI/ConfirmModal";

function ReadModal({
  readMarkerData,
  setPinUpdate,
  deleteMyMarker,
  setOpenReadModal,
}: any) {
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
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  return (
    <div className="modal-outsider show1">
      <div className="modal">
        <div
        className="modal-close-btn"
          onClick={() => {
            setOpenReadModal(false);
          }}
        >
          X
        </div>
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
        <ConfirmModal
          confirmType="readModal"
          openConfirm={openConfirm}
          setOpenConfirm={setOpenConfirm}
          deleteMyMarker={deleteMyMarker}
          readMarkerData={readMarkerData}
        />
      </div>
      {isLogin && mode === "READ" ? (
        <button
          className="delete-pin-btn"
          // onClick={() => deleteMyMarker(readMarkerData._id)}
          onClick={() => setOpenConfirm(true)}
        >
          삭제
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ReadModal;
