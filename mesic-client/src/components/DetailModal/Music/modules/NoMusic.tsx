import { useSelector } from "react-redux";
import { RootState } from "../../../../reducers";

function NoMusic({ setOpenEditMusic }: any) {
  const state = useSelector((state: RootState) => state);
  const { mode } = state.modeReducer.user;
  const { isLogin } = state.userReducer.user;

  return (
    <>
      {isLogin && mode !== "WATCH" ? (
        <>
          <div className="post-icon">
            <i className="fa fa-headphones fa-lg" aria-hidden="true" />
          </div>
          <div className="add-btn-container">
            <button
              className="add-btn-music"
              onClick={() => setOpenEditMusic(true)}
            >
              +
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="edit-del-btn">
            <i className="fa fa-headphones fa-lg" aria-hidden="true" />
          </div>
          <div className="follow-widget-outsider">
            <div className="no-music">음악이 없습니다.</div>
          </div>
        </>
      )}
    </>
  );
}

export default NoMusic;
