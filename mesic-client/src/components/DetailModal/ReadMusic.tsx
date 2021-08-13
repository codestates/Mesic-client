import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import ConfirmModal from "../UI/ConfirmModal";
import EditMusic from "../DetailModal/EditMusic";
import pauseImg from "../../images/pause.png";
import playImg from "../../images/play.png";
import { readMusic } from "../../types";

function ReadMusic({ readMusic, setReadMusic, markerId, setPinUpdate }: any) {
  const { mode } = useSelector((state: RootState) => state.modeReducer).user;
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openEditMusic, setOpenEditMusic] = useState<boolean>(false);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [updateMusic, setUpdateMusic] = useState<readMusic>({
    video_Id: "",
    title: "",
    thumbnail: "",
  });

  const state = useSelector((state: RootState) => state.userReducer);
  const { isLogin, token } = state.user;

  const updateReadMusic = () => {
    const data = { music: updateMusic };
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/music/${markerId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        getUpdatedPin();
      });
  };

  const deleteReadMusic = () => {
    const data = {
      music: {
        video_Id: "",
        title: "",
        thumbnail: "",
      },
    };
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/music/${markerId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        getUpdatedPin();
      });
  };

  const getUpdatedPin = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/pins/pins/${markerId}`)
      .then((res) => {
        setReadMusic(res.data.music);
        setPinUpdate(true);
        setUpdateMode(false);
        setOpenConfirm(false);
        setIsPlay(true);
      });
  };

  const [isPlay, setIsPlay] = useState<boolean>(true);

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

  useEffect(() => {
    if (updateMode && isPlay) {
      setIsPlay(false);
    }
    return;
  }, [updateMode]);

  return (
    <>
      <ConfirmModal
        confirmType="readMusic"
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        setReadMusic={setReadMusic}
        updateMode={updateMode}
        setUpdateMusic={setUpdateMusic}
        deleteReadMusic={deleteReadMusic}
      />
      <EditMusic
        openEditMusic={openEditMusic}
        setOpenEditMusic={setOpenEditMusic}
        setUpdateMode={setUpdateMode}
        setUpdateMusic={setUpdateMusic}
        setReadMusic={setReadMusic}
      />
      <div className="music">
        {updateMode && (
          <>
            <div className="update-mode-post-icon">
              <i className="fa fa-headphones fa-lg" aria-hidden="true"></i>
            </div>
            <div className="widget-outsider">
              <img className="thumbnail-cd" src={updateMusic.thumbnail}></img>
              <div className="title-cd-hidden">
                <div className="title-cd">{updateMusic.title}</div>
              </div>
              <iframe
                src={`https://www.youtube.com/embed/ ${
                  updateMusic.video_Id &&
                  updateMusic.video_Id +
                    "?modestbranding=1&enablejsapi=1&autoplay=0&loop=1&playlist=" +
                    updateMusic.video_Id
                }`}
                id="ytplayer"
                frameBorder="0"
                allow="autoplay"
              ></iframe>
              <div onClick={() => setIsPlay(isPlay ? false : true)}>
                <img className="play-pause" src={isPlay ? pauseImg : playImg} />
              </div>
            </div>
            <div className="save-cancel-btn">
              <button onClick={updateReadMusic}>저장</button>
              <button
                onClick={() => {
                  setUpdateMode(false);
                  setUpdateMusic({
                    video_Id: "",
                    title: "",
                    thumbnail: "",
                  });
                }}
              >
                취소
              </button>
            </div>
          </>
        )}
        {updateMode || (
          <div>
            {isLogin && mode !== "WATCH" ? ( //내 핀 읽기모드 + 음악이 있을 때
              readMusic.video_Id.length > 0 ? (
                <>
                  <div className="edit-del-btn">
                    <i
                      className="fa fa-headphones fa-lg"
                      aria-hidden="true"
                    ></i>
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
                  <div className="widget-outsider">
                    <img
                      className="thumbnail-cd"
                      src={readMusic.thumbnail}
                    ></img>
                    <div className="title-cd-hidden">
                      <div className="title-cd">{readMusic.title}</div>
                    </div>
                    <iframe
                      src={`https://www.youtube.com/embed/ ${
                        readMusic.video_Id &&
                        readMusic.video_Id +
                          "?modestbranding=1&enablejsapi=1&autoplay=1&loop=1&playlist=" +
                          readMusic.video_Id
                      }`}
                      id="ytplayer"
                      frameBorder="0"
                      allow="autoplay"
                    ></iframe>
                    <div>
                      <img
                        className="play-pause"
                        src={isPlay ? pauseImg : playImg}
                        onClick={() => setIsPlay(isPlay ? false : true)}
                      />
                    </div>
                  </div>
                </>
              ) : (
                // 내 핀 읽기모드 + 음악이 없을 때
                <>
                  <div className="post-icon">
                    <i
                      className="fa fa-headphones fa-lg"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div className="add-btn-container">
                    <button
                      className="add-btn-music"
                      onClick={() => setOpenEditMusic(true)}
                    >
                      +
                    </button>
                  </div>
                </>
              )
            ) : readMusic.video_Id.length > 0 ? ( // 팔로우 핀 읽기모드 + 음악이 있을 때
              <>
                <div className="post-icon">
                  <i className="fa fa-headphones fa-lg" aria-hidden="true"></i>
                </div>
                <div className="widget-outsider">
                  <img className="thumbnail-cd" src={readMusic.thumbnail}></img>
                  <div className="title-cd-hidden">
                    <div className="title-cd">{readMusic.title}</div>
                  </div>
                  <iframe
                    src={`https://www.youtube.com/embed/ ${
                      readMusic.video_Id &&
                      readMusic.video_Id +
                        "?modestbranding=1&enablejsapi=1&autoplay=1&loop=1&playlist=" +
                        readMusic.video_Id
                    }`}
                    id="ytplayer"
                    frameBorder="0"
                    allow="autoplay"
                  ></iframe>
                  <div onClick={() => setIsPlay(isPlay ? false : true)}>
                    <img
                      className="play-pause"
                      src={isPlay ? pauseImg : playImg}
                      onClick={() => setIsPlay(isPlay ? false : true)}
                    />
                  </div>
                </div>
              </>
            ) : (
              //팔로우 핀 읽기모드 + 음악이 없을 때
              <>
                <div className="edit-del-btn">
                  <i className="fa fa-headphones fa-lg" aria-hidden="true"></i>
                </div>
                <div className="follow-widget-outsider">
                  <div className="no-music">음악이 없습니다.</div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ReadMusic;
