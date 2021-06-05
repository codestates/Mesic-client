import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import EditMusic from "./EditMusic";
import ConfirmModal from "../UI/ConfirmModal";
import pauseImg from "../../images/pause.png";
import playImg from "../../images/play.png";

function PostMusic({ postMusic, setPostMusic }: any) {
  const [openEditMusic, setOpenEditMusic] = useState<boolean>(false);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const [isPlay, setIsPlay] = useState<boolean>(false);

  const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
    input !== null && input.tagName === "IFRAME";

  useEffect(() => {
    let frame = document.getElementById("ytplayer");
    if (isPlay) {
      if (isIFrame(frame) && frame.contentWindow) {
        frame.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
      }
    } else {
      if (isIFrame(frame) && frame.contentWindow) {
        frame.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      }
    }
  }, [isPlay]);

  return (
    <>
      <ConfirmModal
        confirmType="postMusic"
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        setPostMusic={setPostMusic}
        setUpdateMode={setUpdateMode}
      />
      <EditMusic
        openEditMusic={openEditMusic}
        setOpenEditMusic={setOpenEditMusic}
        updateMode={updateMode}
        setUpdateMode={setUpdateMode}
        setPostMusic={setPostMusic}
      />
      <div className="music">
        {updateMode ? (
          <div className="music-content">
            <div className="edit-del-btn">
              <i className="fa fa-headphones" aria-hidden="true"></i>
              <div>
                <i
                  className="fas fa-pencil-alt"
                  aria-hidden="true"
                  onClick={() => setOpenEditMusic(true)}
                ></i>
                <i
                  className="fa fa-trash"
                  aria-hidden="true"
                  onClick={() => setOpenConfirm(true)}
                ></i>
              </div>
            </div>
            <div className="detail-line"></div>
            <div className="widget-outsider">
              <img className="thumbnail-cd" src={postMusic.thumbnail}></img>
              <div className="title-cd">{postMusic.title}</div>
              <iframe
                src={
                  postMusic.video_Id
                    ? `https://www.youtube.com/embed/${postMusic.video_Id}?modestbranding=1&enablejsapi=1&autoplay=0&loop=1&playlist=${postMusic.video_Id}`
                    : "https://www.youtube.com/embed/"
                }
                id="ytplayer"
                frameBorder="0"
                allow="autoplay"
              />
              <div
                onClick={() => {
                  if (!isPlay) {
                    setIsPlay(true);
                  } else {
                    setIsPlay(false);
                  }
                }}
              >
                {isPlay ? (
                  <img className="play-pause" src={pauseImg} />
                ) : (
                  <img className="play-pause" src={playImg} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="post-icon">
              <i className="fa fa-headphones" aria-hidden="true"></i>
            </div>
            <div className="detail-line"></div>
            <button
              className="add-btn-music"
              onClick={() => setOpenEditMusic(true)}
            >
              +
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default PostMusic;
