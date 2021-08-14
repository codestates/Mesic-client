import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

function NoMemo({
  addMemoInput,
  handleAddMemo,
  savebtn,
  setSavebtn,
  addReadMemo,
  setAddedMemo,
}: any) {
  const state = useSelector((state: RootState) => state);
  const { mode } = state.modeReducer.user;
  const { isLogin } = state.userReducer.user;

  return (
    <>
      {isLogin && mode !== "WATCH" ? (
        <>
          <div className="edit-del-btn">
            <i className="fa fa-sticky-note read fa-lg" aria-hidden="true"></i>
          </div>
          <div className="textarea-outsider">
            <textarea
              ref={addMemoInput}
              className="input-memo"
              placeholder={"메모를 입력해주세요."}
              onChange={handleAddMemo}
            />
          </div>
          {mode === "READ" && savebtn && (
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
          )}
        </>
      ) : (
        <>
          <div className="edit-del-btn">
            <i className="fa fa-sticky-note read fa-lg" aria-hidden="true"></i>
          </div>
          <div className="read-memo no-contents">메모가 없습니다.</div>
        </>
      )}
    </>
  );
}

export default NoMemo;
