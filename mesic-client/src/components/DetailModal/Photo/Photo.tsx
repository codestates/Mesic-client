import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

function Photo({ imageInput, handleImage, setOpenConfirm, readImg }: any) {
  const state = useSelector((state: RootState) => state);
  const { mode } = state.modeReducer.user;
  const { isLogin } = state.userReducer.user;

  return (
    <>
      <div className="edit-del-btn">
        <i className="fa fa-camera fa-lg" />
        {isLogin && mode !== "WATCH" && (
          <div>
            <label className="edit-btn-photo" htmlFor="photo-file">
              <i className="fas fa-pencil-alt" />
            </label>
            <input
              className="input-photo"
              ref={imageInput}
              type="file"
              id="photo-file"
              accept="image/*"
              onChange={handleImage}
            />
            <i
              className="fa fa-trash"
              aria-hidden="true"
              onClick={() => setOpenConfirm(true)}
            />
          </div>
        )}
      </div>
      <div className="photo-img-outsider">
        <img className="photo-img" src={readImg} />
      </div>
    </>
  );
}

export default Photo;
