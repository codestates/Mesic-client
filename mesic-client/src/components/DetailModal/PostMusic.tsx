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
      {updateMode ? (
        <div>
          <iframe
            src={
              postMusic.video_Id
                ? `https://www.youtube.com/embed/${postMusic.video_Id}`
                : "https://www.youtube.com/embed/"
            }
          />
          <button onClick={() => setOpenEditMusic(true)}>수정</button>
          <button onClick={() => setOpenConfirm(true)}>삭제</button>
        </div>
      ) : (
        <div className="border">
          <div>POST MODE</div>
          <button onClick={() => setOpenEditMusic(true)}>+</button>
        </div>
      )}
    </>
  );
}

export default PostMusic;
