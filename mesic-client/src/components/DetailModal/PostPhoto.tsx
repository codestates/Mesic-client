import React, { useRef, useState } from "react";
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

  // Photo 업데이트 버튼
  const handlePostImg = (e: any) => {
    setPostImg(e.target.files[0]);
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
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
      <div className="postPhoto">
        <div className="detail-icon">
          <i className="fa fa-camera"></i>
        </div>
        <div className="detail-line"></div>
        {postImg.length === 0 ? (
          <>
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
          <img className="img" src={previewImg} />
        )}
        {/* <button onClick={() => setOpenConfirm(true)}>삭제</button> */}
      </div>
    </>
  );
}

export default PostPhoto;
