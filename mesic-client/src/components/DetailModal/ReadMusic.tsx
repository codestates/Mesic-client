import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import ConfirmModal from "../UI/ConfirmModal";
import EditMusic from "../DetailModal/EditMusic";
import cdImg from "../../images/cdcd.png";

function ReadMusic({ readMusic, setReadMusic, markerId, setPinUpdate }: any) {
  const { mode } = useSelector((state: RootState) => state.modeReducer).user;
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openEditMusic, setOpenEditMusic] = useState<boolean>(false);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [updateMusic, setUpdateMusic] = useState<{
    video_Id: string;
    title: string;
    thumbnail: string;
  }>({
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
        console.log("deleteMusic: ", res.data.music);
        setReadMusic(res.data.music);
        setPinUpdate(true);
        setUpdateMode(false);
        setOpenConfirm(false);
      });
  };

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
        <div className="detail-icon">
          <i className="fa fa-headphones" aria-hidden="true"></i>
        </div>
        {updateMode ? (
          <div className="music-content">
            <div className="edit-del-btn">
              <i
                className="fa fa-pencil"
                aria-hidden="true"
                onClick={() => setOpenEditMusic(true)}
              ></i>
            </div>
            <div className="detail-line"></div>
            <div className="ifram-outsider">
              <div className="widget-outsider">
                <img src={updateMusic.thumbnail}></img>
                <div>{updateMusic.title}</div>
                <iframe
                  src={
                    updateMusic.video_Id
                      ? `https://www.youtube.com/embed/${updateMusic.video_Id}`
                      : "https://www.youtube.com/embed/"
                  }
                  id="ytplayer"
                  frameBorder="0"
                ></iframe>
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
            </div>
          </div>
        ) : (
          <>
            {isLogin && mode !== "WATCH" ? (
              readMusic.video_Id.length > 0 ? (
                <>
                  <div className="edit-del-btn">
                    {/* <button onClick={() => setOpenEditMusic(true)}>수정</button> */}
                    {/* <button onClick={() => setOpenConfirm(true)}>삭제</button> */}
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
                  <div className="detail-line"></div>
                  <div className="widget-outsider">
                    <img src={readMusic.thumbnail}></img>
                    <div>{readMusic.title}</div>
                    <iframe
                      src={
                        readMusic.video_Id
                          ? `https://www.youtube.com/embed/${readMusic.video_Id}`
                          : "https://www.youtube.com/embed/"
                      }
                      id="ytplayer"
                      frameBorder="0"
                    ></iframe>
                  </div>
                </>
              ) : (
                <>
                  <div className="detail-line"></div>
                  <button
                    className="add-btn-music"
                    onClick={() => setOpenEditMusic(true)}
                  >
                    +
                  </button>
                </>
              )
            ) : readMusic.video_Id.length > 0 ? (
              <>
                <div className="detail-line"></div>
                <div className="widget-outsider">
                  <img src={readMusic.thumbnail}></img>
                  <div>{readMusic.title}</div>
                  <iframe
                    src={
                      readMusic.video_Id
                        ? `https://www.youtube.com/embed/${readMusic.video_Id}`
                        : "https://www.youtube.com/embed/"
                    }
                    id="ytplayer"
                    frameBorder="0"
                  ></iframe>
                </div>
              </>
            ) : (
              <>
                <div className="detail-line"></div>
                <div className="follow-widget-outsider">
                  <img src={cdImg}></img>
                  <div>팔로우가 음악을 추가하지 않았어요</div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ReadMusic;
