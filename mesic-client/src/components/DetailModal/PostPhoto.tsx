import { useRef, useState, useEffect } from "react";
import ConfirmModal from "../UI/ConfirmModal";
import Photo from "./Photo/Photo";
import NoPhoto from "./Photo/NoPhoto";

function PostPhoto({ postImg, setPostImg }: any) {
  const imageInput = useRef<HTMLInputElement>();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<any>(null);
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (typeof postImg !== "object") {
      const splitArr = postImg.split("/");
      const imgName = splitArr[splitArr.length - 1];
      setFileName(imgName);
    }
    return;
  }, [postImg]);

  const handlePostImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setPostImg(e.currentTarget.files[0]);
      setPreviewImg(URL.createObjectURL(e.currentTarget.files[0]));
      setFileName("");
    }
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
