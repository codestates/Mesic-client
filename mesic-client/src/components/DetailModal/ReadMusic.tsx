import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import ConfirmModal from "../UI/ConfirmModal";
import EditMusic from "../DetailModal/EditMusic";

function ReadMusic({ readMusic, setReadMusic }: any) {
  const { mode } = useSelector((state: RootState) => state.userReducer).user;
  const [resetMode, setResetMode] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openEditMusic, setOpenEditMusic] = useState<boolean>(false);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  // const widgetUrl =
  // https://w.soundcloud.com/player/?url=https://soundcloud.com/blackstarmot/justin-bieber-peaches-feat-daniel-caesar-giveon&amp;";
  return (
    <>
      <ConfirmModal
        confirmType="music"
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        setReadMusic={setReadMusic}
      />
      <EditMusic
        openEditMusic={openEditMusic}
        setOpenEditMusic={setOpenEditMusic}
        setResetMode={setResetMode}
      />
      {updateMode ? (
        <div className="border">
          <div className="ifram-outsider">
            <button
              onClick={() => {
                setOpenEditMusic(true);
              }}
            >
              수정
            </button>
            <button onClick={() => setOpenConfirm(true)}>삭제</button>
            <iframe
              height="100%"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={`https://w.soundcloud.com/player/?url=${readMusic}&amp;`}
            ></iframe>
          </div>
        </div>
      ) : (
        <div className="border">
          <div className="ifram-outsider">
            <button onClick={() => setOpenEditMusic(true)}>+</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ReadMusic;
