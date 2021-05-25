import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import ConfirmModal from "..//UI/ConfirmModal";

function ReadMemo({ readMemo, setReadMemo }: any) {
  const state = useSelector((state: RootState) => state.modeReducer);
  const { isLogin } = state.user;

  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [updatedMemo, setUpdatedMemo] = useState<string>("");

  const handleUpdateMemo = (e: any) => {
    setUpdatedMemo(e.target.value);
  };
  const updateReadMemo = () => {
    //서버요청 updatedMemo 전달
    setReadMemo("updated!");
    setUpdateMode(false);
  };

  return (
    <>
      <ConfirmModal
        confirmType="memo"
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        setReadMemo={setReadMemo}
      />
      {updateMode ? (
        <div className="border">
          <textarea onChange={handleUpdateMemo}>{readMemo}</textarea>
          <div>
            {isLogin ? (
              <>
                <button onClick={updateReadMemo}>저장</button>
                <button
                  onClick={() => {
                    setUpdateMode(false);
                    setUpdatedMemo("");
                  }}
                >
                  취소
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div className="border">
          {readMemo.length === 0 ? (
            <>
              {/* <textarea
                onChange={handleUpdateMemo}
                placeholder="메모를 입력해주세요!"
              >
                {readMemo}
              </textarea>
              <button onClick={updateReadMemo}>저장</button> */}
              <button onClick={() => setUpdateMode(true)}>메모 추가하기</button>
            </>
          ) : (
            <div>
              {isLogin ? (
                <>
                  <button onClick={() => setUpdateMode(true)}>수정</button>
                  <button onClick={() => setOpenConfirm(true)}>삭제</button>
                </>
              ) : (
                <></>
              )}
              <div>{readMemo}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ReadMemo;
