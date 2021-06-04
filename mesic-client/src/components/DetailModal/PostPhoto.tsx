import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchMode } from "../../actions/index";
import { RootState } from "../../reducers";
import ConfirmModal from "../UI/ConfirmModal";

function PostPhoto({ postImg, setPostImg }: any) {
  const dispatch = useDispatch();
  const imageInput = useRef<any>();
  const { mode } = useSelector((state: RootState) => state.modeReducer).user;

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<any>({});
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (typeof postImg !== "object") {
      console.log("1");
      const splitArr = postImg.split("/");
      const imgName = splitArr[splitArr.length - 1];
      setFileName(imgName);
    }
    return;
  }, [postImg]);

  // Photo 업데이트 버튼
  const handlePostImg = (e: any) => {
    setPostImg(e.target.files[0]);
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
    setFileName("");
  };

  return (
    <>
      <ConfirmModal
        imageInput={imageInput}
        confirmType="postPhoto"
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        setPostImg={setPostImg}
        // setUpdateMode => false로 변경해야지 처음 상태로 돌아감
      />
      <div className="photo">
        {fileName === "undefined" ? (
          <>
            <div className="post-icon">
              <i className="fa fa-camera"></i>
            </div>
            <div className="detail-line"></div>
            <label className="add-btn-photo" htmlFor="photo-file">
              +
            </label>
            <input
              className="input-photo"
              ref={imageInput}
              type="file"
              id="photo-file"
              accept="image/*"
              onChange={handlePostImg}
            />
          </>
        ) : (
          <>
            <div className="edit-del-btn">
              <i className="fa fa-camera"></i>
              <div>
                <label className="edit-btn-photo" htmlFor="photo-file">
                  <i className="fas fa-pencil-alt"></i>
                </label>
                <input
                  className="input-photo"
                  ref={imageInput}
                  type="file"
                  id="photo-file"
                  accept="image/*"
                  onChange={handlePostImg}
                />
                <i
                  className="fa fa-trash"
                  aria-hidden="true"
                  onClick={() => setOpenConfirm(true)}
                ></i>
              </div>
            </div>
            <div className="detail-line"></div>
            <div className="photo-img-outsider">
              <img className="photo-img" src={previewImg} />
            </div>
          </>
        )}
        {/* <button onClick={() => setOpenConfirm(true)}>삭제</button> */}
      </div>
    </>
  );
}

export default PostPhoto;
