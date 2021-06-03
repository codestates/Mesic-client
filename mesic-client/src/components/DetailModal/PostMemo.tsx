import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BinaryOperatorToken } from "typescript";
import { switchMode } from "../../actions/index";
import { RootState } from "../../reducers";
import ConfirmModal from "../UI/ConfirmModal";

function Memo({ postMemo, setPostMemo }: any) {
  const memoInput = useRef<any>();

  const dispatch = useDispatch();
  const { mode } = useSelector((state: RootState) => state.modeReducer).user;

  const handlePostMemo = (e: any) => {
    setPostMemo(e.target.value);
  };

  return (
    <>
      <div className="memo">
        <div className="detail-icon">
          <i className="fa fa-sticky-note" aria-hidden="true"></i>
        </div>
        <div className="detail-line"></div>
        <div className="textarea-outsider">
          <textarea
            className="input-memo"
            ref={memoInput}
            placeholder={"메모를 입력해주세요!"}
            onChange={handlePostMemo}
          />
        </div>
      </div>
    </>
  );
}

export default Memo;
