import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BinaryOperatorToken } from "typescript";
import { switchMode } from "../../actions/index";
import { RootState } from "../../reducers";
import ConfirmModal from "..//UI/ConfirmModal";

type memoProps = {
  memoHandler: (e: any) => void;
};

function Memo(props: memoProps) {
  const memoInput = useRef<any>();
  const memoValue = useRef<any>();

  const dispatch = useDispatch();
  const { mode } = useSelector((state: RootState) => state.userReducer).user;
  const { memoHandler } = props;

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

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
        <div ref={memoValue} className={`${mode === "READ" ? "show" : "hide"}`}>
          READ MODE
        </div>
        <textarea
          ref={memoInput}
          defaultValue={`${
            mode === "POST"
              ? ""
              : mode === "UPDATE"
              ? memoValue.current?.textContent
              : ""
          }`}
          placeholder={`${mode === "POST" ? "POST 모드 입니다." : ""}`}
          onChange={memoHandler}
          className={`${mode !== "READ" ? "show" : "hide"}`}
        />
        <button
          onClick={() => {
            dispatch(switchMode("UPDATE"));
          }}
        >
          UPDATE
        </button>
        <button
          className={`${mode !== "READ" ? "show" : "hide"}`}
          onClick={handleOpenConfirm}
        >
          RESET
        </button>
      </div>
    </>
  );
}

export default Memo;
