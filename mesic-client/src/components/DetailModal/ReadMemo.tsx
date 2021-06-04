import axios from "axios";
import { read } from "fs";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { setSourceMapRange } from "typescript";
import { RootState } from "../../reducers";
import ConfirmModal from "..//UI/ConfirmModal";

function ReadMemo({ readMemo, setReadMemo, markerId, setPinUpdate }: any) {
  const state = useSelector((state: RootState) => state);
  const { isLogin, token } = state.userReducer.user;
  const { mode } = state.modeReducer.user;

  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [updatedMemo, setUpdatedMemo] = useState<string>("");
  const [savebtn, setSavebtn] = useState<boolean>(false);
  const [addedMemo, setAddedMemo] = useState<string>("");

  const addMemoInput = useRef<any>();

  const handleUpdateMemo = (e: any) => {
    setUpdatedMemo(e.target.value);
  };
  const handleAddMemo = (e: any) => {
    setSavebtn(true);
    setAddedMemo(e.target.value);
  };
  const updateReadMemo = () => {
    //서버요청 updatedMemo 전달
    const data = { memo: updatedMemo };
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/memos/${markerId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        getUpdatedPin();
        setUpdateMode(false);
      })
      .catch((err) => console.log(err));
  };
  const addReadMemo = () => {
    //서버요청 updatedMemo 전달
    const data = { memo: addedMemo };
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/memos/${markerId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        getUpdatedPin();
        setSavebtn(false);
      })
      .catch((err) => console.log(err));
  };

  const getUpdatedPin = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/pins/pins/${markerId}`)
      .then((res) => {
        setReadMemo(res.data.memo);
        setPinUpdate(true);
        setUpdateMode(false);
      });
  };

  return (
    <>
      <ConfirmModal
        confirmType="readMemo"
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        setReadMemo={setReadMemo}
      />
      <div className="memo">
        <div className="detail-icon">
          <i className="fa fa-sticky-note read" aria-hidden="true"></i>
        </div>
        {updateMode ? (
          <div>
            <div className="detail-line"></div>
            <div className="textarea-outsider">
              <textarea className="input-memo" onChange={handleUpdateMemo}>
                {readMemo}
              </textarea>
            </div>
            <div>
              {isLogin ? (
                <div className="save-cancel-btn">
                  <button onClick={updateReadMemo}>저장</button>
                  <button
                    onClick={() => {
                      setUpdateMode(false);
                      setUpdatedMemo("");
                    }}
                  >
                    취소
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <div>
            {isLogin && mode !== "WATCH" ? (
              readMemo.length > 0 ? (
                <>
                  <div className="edit-del-btn">
                    {/* <button onClick={() => setUpdateMode(true)}>수정</button> */}
                    <i
                      className="fas fa-pencil-alt"
                      aria-hidden="true"
                      onClick={() => setUpdateMode(true)}
                    ></i>
                  </div>
                  <div className="detail-line"></div>
                  <div className="read-memo">{readMemo}</div>
                </>
              ) : (
                <>
                  <div className="detail-line"></div>
                  <div className="textarea-outsider">
                    <textarea
                      ref={addMemoInput}
                      className="input-memo"
                      placeholder={"메모를 입력해주세요."}
                      onChange={handleAddMemo}
                    />
                  </div>
                  {savebtn ? (
                    <div className="save-cancel-btn">
                      <button onClick={addReadMemo}>저장</button>
                      <button
                        onClick={() => {
                          setSavebtn(false);
                          setAddedMemo("");
                          addMemoInput.current.value = "";
                        }}
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )
            ) : readMemo.length > 0 ? (
              <>
                <div className="detail-line"></div>
                <div className="read-memo">{readMemo}</div>
              </>
            ) : (
              <>
                <div className="detail-line"></div>
                <div className="read-memo">팔로우의 메모가 없습니다.</div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ReadMemo;
