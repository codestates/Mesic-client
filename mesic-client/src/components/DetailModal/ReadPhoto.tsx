import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import ConfirmModal from "..//UI/ConfirmModal";
import axios from "axios";
import AWS from "aws-sdk";
import UpdatePhoto from "./Photo/UpdatePhoto";
import Photo from "./Photo/Photo";
import NoPhoto from "./Photo/NoPhoto";

function ReadPhoto({ readImg, setReadImg, markerId, setPinUpdate }: any) {
  const state = useSelector((state: RootState) => state);
  const { token } = state.userReducer.user;

  const editedImageInput = useRef<HTMLInputElement>(null);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [editedImg, setEditedImg] = useState<any>(null);
  const [editedPreviewImg, setEditedPreviewImg] = useState<string>("");
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const splitArr = readImg.split("/");
  const fileName = splitArr[splitArr.length - 1];

  const handleEditedImg = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && editedImageInput.current?.value) {
      setUpdateMode(true);
      setEditedImg(e.currentTarget.files[0]);
      setEditedPreviewImg(URL.createObjectURL(e.currentTarget.files[0]));
      editedImageInput.current.value = "";
    }
  };
  const updateReadImg = () => {
    //s3에 업데이트 후 서버로 patch요청, 다시 get요청
    const accessKeyId = process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID;
    const secretAccessKey = process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY_ID;
    const region = process.env.REACT_APP_AWS_S3_REGION;

    const s3 = new AWS.S3({ accessKeyId, secretAccessKey, region }); //s3 configuration

    const param = {
      Bucket: `${process.env.REACT_APP_AWS_S3_BUCKET}`,
      Key: `image/${editedImg.name}`,
      ACL: "public-read",
      Body: editedImg,
      ContentType: "image/jpg",
    }; //s3 업로드에 필요한 옵션 설정

    s3.upload(param, function (err: Error, data: any) {
      if (err) {
        console.log(err);
        return;
      }

      const updateData = {
        photo: data.Location,
      };

      axios
        .patch(
          `${process.env.REACT_APP_SERVER_URL}/photos/${markerId}`,
          updateData,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setEditedImg(null);
          getUpdatedPin();
        })
        .catch((err) => console.log(err));
    });
  };

  const getUpdatedPin = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/pins/pins/${markerId}`)
      .then((res) => {
        setReadImg(res.data.photo);
        setPinUpdate(true);
        setUpdateMode(false);
      });
  };

  return (
    <>
      <ConfirmModal
        confirmType="readPhoto"
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        readImg={readImg}
        setReadImg={setReadImg}
        markerId={markerId}
        setPinUpdate={setPinUpdate}
      />
      <div className="photo">
        {updateMode && (
          <UpdatePhoto
            editedPreviewImg={editedPreviewImg}
            updateReadImg={updateReadImg}
            setUpdateMode={setUpdateMode}
            setEditedImg={setEditedImg}
          />
        )}
        {updateMode || (
          <>
            {fileName !== "undefined" ? (
              <Photo
                imageInput={editedImageInput}
                handleImage={handleEditedImg}
                setOpenConfirm={setOpenConfirm}
                readImg={readImg}
              />
            ) : (
              <NoPhoto
                imageInput={editedImageInput}
                handleImage={handleEditedImg}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ReadPhoto;
