import { useSelector } from "react-redux";
import { RootState } from "../../../../reducers";
import { MemoProps } from "../../../../props-types";

function Memo({ readMemo, setUpdateMode }: MemoProps) {
  const state = useSelector((state: RootState) => state);
  const { isLogin } = state.userReducer.user;
  const { mode } = state.modeReducer.user;

  return (
    <>
      {isLogin && mode !== "WATCH" ? (
        <>
          <div className="edit-del-btn">
            <i className="fa fa-sticky-note read fa-lg" aria-hidden="true"></i>
            <i
              className="fas fa-pencil-alt"
              aria-hidden="true"
              onClick={() => setUpdateMode(true)}
            ></i>
          </div>
          <div className="read-memo-container">
            <div className="read-memo">{readMemo}</div>
          </div>
        </>
      ) : (
        <>
          <div className="edit-del-btn">
            <i className="fa fa-sticky-note read fa-lg" aria-hidden="true"></i>
          </div>
          <div className="read-memo" style={{ alignSelf: "center" }}>
            {readMemo}
          </div>
        </>
      )}
    </>
  );
}

export default Memo;
