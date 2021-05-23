import React from "react";

function ConfirmModal({
  confirmType,
  openConfirm,
  setOpenConfirm,
  setReadImg,
  setReadMemo,
  //setPostMusic
  setReadMusic,
}: any) {
  const deleteReadImg = () => {
    //서버요청
    setReadImg(null);
    setOpenConfirm(false);
  };
  const deleteReadMemo = () => {
    //서버요청
    setReadMemo("");
    setOpenConfirm(false);
  };
  const deletePostMusic = () => {
    //setPostMusic(null);
    setOpenConfirm(false);
  };
  const deleteReadMusic = () => {
    setReadMusic(null);
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
          ) : confirmType === "photo" ? (
            <button onClick={deleteReadImg}>예-photo</button>
          ) : confirmType === "postMusic" ? (
            <button onClick={deletePostMusic}>예-postMusic</button>
          ) : confirmType === "readMusic" ? (
            <button onClick={deleteReadMusic}>예-readMusic</button>
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
