import React from "react";

function ConfirmModal({
  confirmType,
  openConfirm,
  setOpenConfirm,
  setPostImg,
  setReadImg,
  setReadMemo,
  setPostMusic,
  setReadMusic,
  setUpdateMode,
  updateMode,
  setUpdateMusic,

}: any) {
  const deleteReadImg = () => {
    //서버요청
    setReadImg(null);
    setOpenConfirm(false);
  };
  const deletePostImg = () => {
    setPostImg(null);
    setOpenConfirm(false);
  };
  const deleteReadMemo = () => {
    //서버요청
    setReadMemo("");
    setOpenConfirm(false);
  };
  const deletePostMusic = () => {
    //setPostMusic(null);
    setUpdateMode(false); // PostMusic 위젯을 비활성화
    setOpenConfirm(false);
  };
  const deleteReadMusic = () => {
    setReadMusic(null);
    setOpenConfirm(false);
  };
  const deleteUpdateMusic = () => {
    setUpdateMusic(null);
    setOpenConfirm(false);
  };

  return (
    <div className={`background ${openConfirm ? "show" : ""}`}>
      <div className="confirm-modal-outsider" />
      <div className="confirm-modal">
        <div>삭제하시겠습니까?</div>
        <div>
          {confirmType === "memo" ? (
            <button onClick={deleteReadMemo}>예-memo</button>
          ) : confirmType === "postPhoto" ? (
            <button onClick={deletePostImg}>예-postPhoto</button>
          ) : confirmType === "readPhoto" ? (
            <button onClick={deleteReadImg}>예-readPhoto</button>
          ) : confirmType === "postMusic" ? (
            <button onClick={deletePostMusic}>예-postMusic</button>
          ) : confirmType === "readMusic" && updateMode === false ? (
            <button onClick={deleteReadMusic}>예-readeMusic</button>
          ) : confirmType === "readMusic" && updateMode ? (
            <button onClick={deleteUpdateMusic}>예-updateMusic</button>
          ) : (
            <></>
          )}
          <button onClick={() => setOpenConfirm(false)}>아니오</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
