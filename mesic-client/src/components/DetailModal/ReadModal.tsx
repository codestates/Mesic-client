import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import ReadMusic from "./Music/ReadMusic";
import ReadPhoto from "./Photo/ReadPhoto";
import ReadMemo from "./Memo/ReadMemo";
import ConfirmModal from "../UI/ConfirmModal";
import { musicData } from "../../state-types";
import { ReadModalProps } from "../../props-types";

function ReadModal({
  readMarkerData,
  setPinUpdate,
  deleteMyMarker,
  setOpenReadModal,
}: ReadModalProps) {
  const state = useSelector((state: RootState) => state);
  const { isLogin } = state.userReducer.user;
  const { mode } = state.modeReducer.user;
  
  const { video_Id, title, thumbnail } = readMarkerData!.music;
  const { photo, memo, _id } = readMarkerData!;
  const [readMusic, setReadMusic] = useState<musicData>({
    video_Id,
    title,
    thumbnail,
  });
  const [readImg, setReadImg] = useState<string>("");
  const [readMemo, setReadMemo] = useState<string>("");
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  useEffect(() => {
    setReadImg(photo);
  }, [photo]);

  useEffect(() => {
    setReadMemo(memo);
  }, [memo]);

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
