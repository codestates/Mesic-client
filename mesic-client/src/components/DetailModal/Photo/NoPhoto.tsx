import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

function NoPhoto({ imageInput, handleImage }: any) {
  const state = useSelector((state: RootState) => state);
  const { mode } = state.modeReducer.user;
  const { isLogin } = state.userReducer.user;

  return (
    <>
      <div>
        <div
          className={isLogin && mode !== "WATCH" ? "post-icon" : "edit-del-btn"}
        >
          <i className="fa fa-camera fa-lg" />
        </div>
        {isLogin && mode !== "WATCH" ? (
          <div className="add-btn-outsider add-btn-container">
            <label className="add-btn-read-photo" htmlFor="photo-file">
              +
            </label>
            <input
              className="input-photo"
              ref={imageInput}
              type="file"
              id="photo-file"
              accept="image/*"
              onChange={handleImage}
            />
          </div>
        ) : (
          <div className="no-contents">사진이 없습니다.</div>
        )}
      </div>
    </>
  );
}

export default NoPhoto;
