import React from "react";

type confirmProps = {
  confirmType: string;
  openConfirm: boolean;
  handleCloseConfirm: () => void;
  resetMemo?: () => void;
  handleResetMusic?: () => void;
};

function ConfirmModal(props: confirmProps) {
  const {
    confirmType,
    openConfirm,
    handleCloseConfirm,
    resetMemo,
    handleResetMusic,
  } = props;

  return (
    <div className={`background ${openConfirm ? "show" : ""}`}>
      <div className="confirm-modal-outsider" />
      <div className="confirm-modal">
        <div>삭제하시겠습니까?</div>
        <div>
          {confirmType === "memo" ? (
            <button onClick={resetMemo}> 예</button>
          ) : confirmType === "photo" ? (
            <button>예-photo</button>
          ) : confirmType === "music" ? (
            <button onClick={handleResetMusic}>예-music</button>
          ) : (
            <></>
          )}
          <button onClick={handleCloseConfirm}>아니오</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
