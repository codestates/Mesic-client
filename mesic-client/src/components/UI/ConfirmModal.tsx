import React from "react";

function ConfirmModal({
  confirmType,
  openConfirm,
  setOpenConfirm,
  setReadImg,
  setReadMemo,
}: any) {
  const deleteReadImg = () => {
    //서버요청
    setReadImg(null);
    setOpenConfirm(false);
  };
  const deletedReadMemo = () => {
    //서버요청
    setReadMemo("");
    setOpenConfirm(false);
  };

  return (
    <div className={`background ${openConfirm ? "show" : ""}`}>
      <div className="confirm-modal-outsider" />
      <div className="confirm-modal">
        <div>삭제하시겠습니까?</div>
        <div>
          {confirmType === "memo" ? (
            <button onClick={deletedReadMemo}>예-memo</button>
          ) : confirmType === "photo" ? (
            <button onClick={deleteReadImg}>예-photo</button>
          ) : confirmType === "music" ? (
            <button>예-music</button>
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
