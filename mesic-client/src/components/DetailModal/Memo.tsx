import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BinaryOperatorToken } from "typescript";
import { switchMode } from "../../actions/index";
import { RootState } from "../../reducers";
import ConfirmModal from "..//UI/ConfirmModal";


function Memo({memoHandler}: any) {
  
  const memoInput = useRef<any>();
  const memoValue = useRef<any>();

  const dispatch = useDispatch();

  const { mode } = useSelector((state: RootState) => state.userReducer).user;

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openMemoInput, setOpenMemoInput] = useState<boolean>(false);
  const [showMemoUpdate, setShowMemoUpdate] = useState<boolean>(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const resetMemo = () => {
    memoInput.current.value = "";
    handleCloseConfirm();
  };

  return (
    <>
      <ConfirmModal
        confirmType="memo"
        openConfirm={openConfirm}
        handleCloseConfirm={handleCloseConfirm}
        resetMemo={resetMemo}
      ></ConfirmModal>
      <div className="border">
        <div
          className={`${!openMemoInput && mode === "READ" ? "show" : "hide"}`}
        >
          <span>내용을 수정하시려면 메모를 클릭해주세요</span>
          <div
            onClick={() => {
              memoInput.current.value = memoValue.current.textContent;
              setOpenMemoInput(true);
              setShowMemoUpdate(true);
            }}
            ref={memoValue}
          >
            READ MODE
          </div>
        </div>

        <textarea
          ref={memoInput}
          placeholder={"메모를 입력해주세요!"}
          onChange={memoHandler}
          className={`${openMemoInput || mode === "POST" ? "show" : "hide"}`}
        />

        <span className={`${showMemoUpdate ? "show" : "hide"}`}>
          <button
            onClick={() => {
              setShowMemoUpdate(false);
              setOpenMemoInput(false);
            }}
          >
            Cancel Update
          </button>
          <button
            onClick={() => {
              // 서버에 PATCH 요청
              setShowMemoUpdate(false);
              setOpenMemoInput(false);
            }}
          >
            UPDATE
          </button>
          <button onClick={handleOpenConfirm}>RESET</button>
        </span>
      </div>
    </>
  );
}

export default Memo;
