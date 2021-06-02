import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { createNoSubstitutionTemplateLiteral } from "typescript";
import { RootState } from "../../reducers";
import ConfirmModal from "..//UI/ConfirmModal";

function ReadPhoto({ readImg, setReadImg }: any) {
  const state = useSelector((state: RootState) => state);
  const { isLogin } = state.userReducer.user;
  const { mode } = state.modeReducer.user;

  const editedImageInput = useRef<any>();

  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [editedImg, setEditedImg] = useState<any>(null);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const splitArr = readImg.split("/");
  const fileName = splitArr[splitArr.length - 1];

  const handleEditedImg = (e: any) => {
    setUpdateMode(true);
    setEditedImg(URL.createObjectURL(e.target.files[0]));
    editedImageInput.current.value = "";
  };
  const updateReadImg = () => {
    //서버요청 editedImg 전달
    setUpdateMode(false);
  };

  return (
    <>
      <ConfirmModal
        confirmType="readPhoto"
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        setReadImg={setReadImg}
      />
      <div className="photo">
        <div className="detail-icon">
          <i className="fa fa-camera"></i>
        </div>
        {updateMode ? (
          <div>
            <div className="detail-line"></div>
            <input
              className="input-photo"
              ref={editedImageInput}
              type="file"
              id="photo-file"
              accept="image/*"
              onChange={handleEditedImg}
            />
            <div className="photo-img-outsider">
              <img className="photo-img" src={editedImg} />
            </div>
            <div>
              <button onClick={updateReadImg}>저장</button>
              <button
                onClick={() => {
                  setUpdateMode(false);
                  setEditedImg("");
                }}
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <div>
            {isLogin && mode !== "WATCH" ? (
              fileName !== "undefined" ? (
                <>
                  <label className="edit-btn-photo" htmlFor="photo-file">
                    수정
                  </label>
                  <input
                    className="input-photo"
                    ref={editedImageInput}
                    type="file"
                    id="photo-file"
                    accept="image/*"
                    onChange={handleEditedImg}
                  />
                  <button onClick={() => setOpenConfirm(true)}>삭제</button>
                  <div className="detail-line"></div>
                  <div className="photo-img-outsider">
                    <img className="photo-img" src={readImg} />
                  </div>
                </>
              ) : (
                <>
                  <div className="detail-line"></div>
                  <label className="add-btn-photo" htmlFor="photo-file">
                    +
                  </label>
                  <input
                    className="input-photo"
                    ref={editedImageInput}
                    type="file"
                    id="photo-file"
                    accept="image/*"
                    onChange={handleEditedImg}
                  />
                </>
              )
            ) : fileName !== "undefined" ? (
              <>
                <div className="detail-line"></div>
                <div className="photo-img-outsider">
                  <img className="photo-img" src={readImg} />
                </div>
              </>
            ) : (
              <div>팔로우가 사진을 추가하지 않음</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ReadPhoto;
