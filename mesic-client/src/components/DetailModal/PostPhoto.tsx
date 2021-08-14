import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import ConfirmModal from "../UI/ConfirmModal";
import Photo from "./Photo/Photo";
import NoPhoto from "./Photo/NoPhoto";

function PostPhoto({ postImg, setPostImg }: any) {
  const imageInput = useRef<any>();
  const state = useSelector((state: RootState) => state);
  const { mode } = state.modeReducer.user;
  const { isLogin } = state.userReducer.user;

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<any>({});
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (typeof postImg !== "object") {
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
      />
      <div className="photo">
        {fileName === "undefined" ? (
          <NoPhoto imageInput={imageInput} handleImage={handlePostImg} />
        ) : (
          <Photo
            imageInput={imageInput}
            handleImage={handlePostImg}
            setOpenConfirm={setOpenConfirm}
            readImg={previewImg}
          />
        )}
      </div>
    </>
  );
}

export default PostPhoto;
