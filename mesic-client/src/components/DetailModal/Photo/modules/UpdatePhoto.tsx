import { UpdatePhotoProps } from "../../../../props-types";

function UpdatePhoto({
  editedPreviewImg,
  updateReadImg,
  setUpdateMode,
  setEditedImg,
}: UpdatePhotoProps) {
  return (
    <>
      <div className="update-mode-post-icon">
        <i className="fa fa-camera fa-lg" />
      </div>
      <div className="photo-img-outsider add-btn-container">
        <img className="photo-img" src={editedPreviewImg} />
      </div>
      <div className="save-cancel-btn">
        <button onClick={updateReadImg}>저장</button>
        <button
          onClick={() => {
            setUpdateMode(false);
            setEditedImg(null);
          }}
        >
          취소
        </button>
      </div>
    </>
  );
}

export default UpdatePhoto;
