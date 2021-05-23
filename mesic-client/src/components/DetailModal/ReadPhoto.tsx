import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import ConfirmModal from "..//UI/ConfirmModal";

type ReadPhotoProps = {};

function ReadPhoto({ readImg, setReadImg }: any) {
  const editedImageInput = useRef<any>();
  const { mode } = useSelector((state: RootState) => state.userReducer).user;

  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [editedImg, setEditedImg] = useState<any>(null);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const updateRes = {
    updatedMusic: null,
    updatedImage:
      "https://i.pinimg.com/originals/41/71/22/417122c96d96351f9a2d9c96aadb884f.jpg",
    updatedMemo: "updated!",
  };
  const { updatedMusic, updatedImage, updatedMemo } = updateRes;

  const handleEditedImg = (e: any) => {
    setUpdateMode(true);
    setEditedImg(URL.createObjectURL(e.target.files[0]));
    editedImageInput.current.value = "";
  };
  const updateReadImg = () => {
    //서버요청 editedImg 전달
    setReadImg(updatedImage);

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
      {updateMode ? (
        <div className="border">
          <input
            ref={editedImageInput}
            type="file"
            accept="image/*"
            onChange={handleEditedImg}
          />
          <img className="img" src={editedImg} />
          <div>
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
        </div>
      ) : (
        <div className="border">
          <input
            ref={editedImageInput}
            type="file"
            accept="image/*"
            onChange={handleEditedImg}
          />
          <button onClick={() => setOpenConfirm(true)}>삭제</button>
          <div>
            <img className="img" src={readImg} />
          </div>
        </div>
      )}
    </>
  );
}

export default ReadPhoto;
