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
        // setUpdateMode => false로 변경해야지 처음 상태로 돌아감
      />
      <EditMusic
        openEditMusic={openEditMusic}
        setOpenEditMusic={setOpenEditMusic}
        setUpdateMode={setUpdateMode}
        setPostMusic={setPostMusic}
      />
      {updateMode ? (
        <div>
          <iframe
            src={`https://www.youtube.com/embed/${postMusic.id.videoId}`}
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
