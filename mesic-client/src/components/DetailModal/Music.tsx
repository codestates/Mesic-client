import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import EditMusic from "./EditMusic";
import ConfirmModal from "../UI/ConfirmModal";

type MusicProps = {
  music: string;
  musicHandler: (song: string) => void;
  resetMusic: () => void;
};

function Music(props: MusicProps) {
  const { mode } = useSelector((state: RootState) => state.userReducer).user;
  const { music, musicHandler, resetMusic } = props;

  const [openEditMusic, setOpenEditMusic] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  //삭제 확인 모달
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleResetMusic = () => {
    resetMusic();
    handleCloseConfirm();
  };

  //음악 선택 모달
  const handleOpenEditMusic = () => {
    setOpenEditMusic(true);
  };
  const handleCloseEditMusic = () => {
    setOpenEditMusic(false);
  };
  const handleSelectMusic = (e: any) => {
    console.log(e.target.value);
    musicHandler(e.target.value);
    handleCloseEditMusic();
  };

  // const widgetUrl =
  //   "https://w.soundcloud.com/player/?url=https://soundcloud.com/blackstarmot/justin-bieber-peaches-feat-daniel-caesar-giveon&amp;";
  return (
    <>
      <ConfirmModal
        confirmType="music"
        handleResetMusic={handleResetMusic}
        openConfirm={openConfirm}
        handleCloseConfirm={handleCloseConfirm}
      ></ConfirmModal>
      <EditMusic
        openEditMusic={openEditMusic}
        handleCloseEditMusic={handleCloseEditMusic}
        handleSelectMusic={handleSelectMusic}
      ></EditMusic>
      <div className="border">
        {mode === "POST" ? (
          music.length === 0 ? (
            <button onClick={handleOpenEditMusic}>+</button>
          ) : (
            <div className="iframe-outsider">
              <button onClick={handleOpenEditMusic}>다시 선택하기</button>
              <iframe
                onClick={handleOpenEditMusic}
                height="100%"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={music}
              ></iframe>
            </div>
          )
        ) : mode === "READ" ? (
          music.length === 0 ? (
            <button onClick={handleOpenEditMusic}>+</button>
          ) : (
            <div className="ifram-outsider">
              <button onClick={handleOpenEditMusic}>음악 바꾸기</button>
              <button onClick={handleOpenConfirm}>RESET</button>
              <iframe
                onClick={handleOpenEditMusic}
                height="100%"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={music}
              ></iframe>
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Music;
