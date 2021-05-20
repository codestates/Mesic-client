import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BinaryOperatorToken} from "typescript";
import {switchMode} from "../../actions/index";
import {RootState} from "../../reducers";
import ConfirmModal from "..//UI/ConfirmModal";


function Memo({
  memoHandler,
  openConfirm,
  handleOpenConfirm,
  handleCloseConfirm,
}: any) {

  const memoInput = useRef<any>();
  const memoValue = useRef<any>();

  const dispatch = useDispatch();

  const { mode } = useSelector((state: RootState) => state.userReducer).user;
  const { memoHandler } = props;

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
        <span>내용을 수정하시려면 메모를 클릭해주세요</span>
        <div
          onClick={() => {
            setOpenMemoInput(true);
            setShowMemoUpdate(true);
          }}
          ref={memoValue}
          className={`${!openMemoInput ? "show" : "hide"}`}
        >
          READ MODE
        </div>

        <textarea
          ref={memoInput}
          defaultValue={`${
            mode === "POST" ? memoValue.current?.textContent : ""
          }`}
          placeholder={"메모를 입력해주세요!"}
          onChange={memoHandler}
          className={`${openMemoInput ? "show" : "hide"}`}
        />

        <button
          className={`${showMemoUpdate ? "show" : "hide"}`}
          onClick={() => {
            setShowMemoUpdate(false);
            setOpenMemoInput(false);
          }}
        >
          Cancel Update
        </button>
        <button className={`${showMemoUpdate ? "show" : "hide"}`}>
          UPDATE
        </button>

        <button
          className={`${showMemoUpdate ? "show" : "hide"}`}
          onClick={handleOpenConfirm}
        >
          RESET
        </button>
      </div>
    </>
  );
}

export default Memo;
