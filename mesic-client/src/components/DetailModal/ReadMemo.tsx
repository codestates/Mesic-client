import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchMode } from "../../actions";
import { RootState } from "../../reducers";
import ConfirmModal from "..//UI/ConfirmModal";

type ReadMemoProps = {};

function ReadMemo({ readMemo, setReadMemo }: any) {
  const { mode } = useSelector((state: RootState) => state.userReducer).user;

  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  return (
    <>
      <ConfirmModal
        confirmType="memo"
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        setReadMemo={setReadMemo}
      />
      {updateMode ? (
        <div className="border"></div>
      ) : (
        <div className="border">
          <div>
            <button>수정</button>
            <button>삭제</button>
          </div>
          <div>{readMemo}</div>
        </div>
      )}
    </>
  );
}

export default ReadMemo;
