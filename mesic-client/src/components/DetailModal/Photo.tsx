import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchMode } from "../../actions/index";
import { RootState } from "../../reducers";
import ConfirmModal from "..//UI/ConfirmModal";

function Photo({
  previewImg,
  fileSelectedHandler,
  setPreviewImg,
  setUploadImg,
}: any) {
  const dispatch = useDispatch();
  const imageInput = useRef<any>();
  const { mode } = useSelector((state: RootState) => state.userReducer).user;

  const [showPhotoUpdate, setShowPhotoUpdate] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  // Photo 업데이트 버튼
  const handleFileChange = () => {
    if (imageInput.current?.value && mode === "READ") {
      setShowPhotoUpdate(true);
    } else {
      setShowPhotoUpdate(false);
    }
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const resetPhoto = () => {
    imageInput.current.value = "";
    setPreviewImg("");
    setUploadImg(null);
    handleCloseConfirm();
  };

  return (
    <>
      <ConfirmModal
        confirmType="photo"
        openConfirm={openConfirm}
        handleCloseConfirm={handleCloseConfirm}
        resetPhoto={resetPhoto}
      ></ConfirmModal>
      <div className="border">
        photo
        <button className={`${showPhotoUpdate ? "show" : "hide"}`}>
          UPDATE
        </button>
        {mode === "READ" && previewImg.length !== 0 ? (
          <>
            <button className="reset-btn" onClick={handleOpenConfirm}>
              RESET
            </button>
          </>
        ) : (
          <></>
        )}
        <input
          ref={imageInput}
          type="file"
          accept="image/*"
          onChange={(e) => {
            console.log(mode);
            fileSelectedHandler(e);
            handleFileChange();
          }}
        />
        <img className="img" src={previewImg} />
      </div>
    </>
  );
}

export default Photo;
