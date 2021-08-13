import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import ReadMusic from "./ReadMusic";
import ReadPhoto from "./ReadPhoto";
import ReadMemo from "./ReadMemo";
import ConfirmModal from "../UI/ConfirmModal";
import { readMusic } from "../../types";

function ReadModal({
  readMarkerData,
  setPinUpdate,
  deleteMyMarker,
  setOpenReadModal,
}: any) {
  const state = useSelector((state: RootState) => state);
  const { isLogin } = state.userReducer.user;
  const { mode } = state.modeReducer.user;
  const { video_Id, title, thumbnail } = readMarkerData.music;
  const { photo, memo, _id } = readMarkerData;
  const [readMusic, setReadMusic] = useState<readMusic>({
    video_Id,
    title,
    thumbnail,
  });
  const [readImg, setReadImg] = useState<string>(photo);
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
      {isLogin && mode === "READ" && (
        <button className="delete-pin-btn" onClick={() => setOpenConfirm(true)}>
          삭제
        </button>
      )}
    </div>
  );
}

export default ReadModal;
