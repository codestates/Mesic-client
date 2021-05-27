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

  // Photo 업데이트 버튼
  const handlePostImg = (e: any) => {
    setPostImg(URL.createObjectURL(e.target.files[0]));
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
      <div className="border">
        <input
          ref={imageInput}
          type="file"
          accept="image/*"
          onChange={handlePostImg}
        />
        {postImg === null ? (
          <div>사진 추가하기</div>
        ) : (
          <>
            <button onClick={() => setOpenConfirm(true)}>삭제</button>
          </>
        )}
        <img className="img" src={postImg} />
      </div>
    </>
  );
}

export default PostPhoto;
