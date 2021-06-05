import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import EditMusic from "./EditMusic";
import ConfirmModal from "../UI/ConfirmModal";

function PostMusic({ postMusic, setPostMusic }: any) {
  const [openEditMusic, setOpenEditMusic] = useState<boolean>(false);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

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
              <img src={postMusic.thumbnail}></img>
              <div>{postMusic.title}</div>
              <iframe
                src={
                  postMusic.video_Id
                    ? `https://www.youtube.com/embed/${postMusic.video_Id}?modestbranding=1`
                    : "https://www.youtube.com/embed/"
                }
                id="ytplayer"
                frameBorder="0"
              />
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
