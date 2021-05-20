import React from "react";

type confirmProps = {
  openConfirm: boolean;
  handleCloseConfirm: () => void;
  resetMemo: () => void;
};

function ConfirmModal(props: confirmProps) {
  const { openConfirm, handleCloseConfirm, resetMemo } = props;

  return (
    <div className={`background ${openConfirm ? "show" : ""}`}>
      <div className="login-signup-modal-outsider" />
      <div className="login-signup-modal">
        <div>삭제하시겠습니까?</div>
        <div>
          <button onClick={resetMemo}>예</button>
          <button onClick={handleCloseConfirm}>아니오</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
