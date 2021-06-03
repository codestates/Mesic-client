import React from "react";
import axios from "axios";
import AWS from "aws-sdk";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

function ConfirmModal({
  confirmType,
  openConfirm,
  setOpenConfirm,
  setPostImg,
  readImg,
  setReadImg,
  setReadMemo,
  setPostMusic,
  setReadMusic,
  setUpdateMode,
  imageInput,
  deleteReadMusic,
  markerId,
  setPinUpdate,
}: any) {
  const state = useSelector((state: RootState) => state);
  const { token } = state.userReducer.user;

  const deleteReadImg = () => {
    //s3에서 삭제 후 받은 응답을 서버로 patch, get 요청

    const bucket = "mesic-photo-bucket";
    AWS.config.region = "ap-northeast-2";
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:2c7d94b9-746d-4871-abdd-69aa237048ca",
    });

    const s3 = new AWS.S3();

    const file = readImg.split("/");
    console.log(file[file.length - 1]);
    const fileName = file[file.length - 1];
    const param = {
      Bucket: bucket,
      Key: `image/${fileName}`,
    }; //s3 업로드에 필요한 옵션 설정

    s3.deleteObject(param, function (err: any, data: any) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("delete complete");

      const location =
        "https://mesic-photo-bucket.s3.ap-northeast-2.amazonaws.com/image/undefined";
      const updateData = {
        photo: location,
      };

      axios
        .patch(
          `${process.env.REACT_APP_SERVER_URL}/photos/${markerId}`,
          updateData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log("delete-patch photo : ", res);
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
        setOpenConfirm(false);
      });
  };

  const deletePostImg = () => {
    // TODO
    setPostImg(null);
    imageInput.current.value = "";
    setOpenConfirm(false);
  };
  const deleteReadMemo = () => {
    //서버요청
    setReadMemo("");
    setOpenConfirm(false);
  };
  const deletePostMusic = () => {
    setPostMusic({
      video_Id: "",
      title: "",
      thumbnail: "",
    });
    setUpdateMode(false); // PostMusic 위젯을 비활성화
    setOpenConfirm(false);
  };

  return (
    <div className={`background ${openConfirm ? "show" : ""}`}>
      <div className="confirm-modal-outsider" />
      <div className="confirm-modal">
        <div>삭제하시겠습니까?</div>
        <div>
          {confirmType === "memo" ? (
            <button onClick={deleteReadMemo}>예-memo</button>
          ) : confirmType === "postPhoto" ? (
            <button onClick={deletePostImg}>예-postPhoto</button>
          ) : confirmType === "readPhoto" ? (
            <button onClick={deleteReadImg}>예-readPhoto</button>
          ) : confirmType === "postMusic" ? (
            <button onClick={deletePostMusic}>예-postMusic</button>
          ) : confirmType === "readMusic" ? (
            <button onClick={() => deleteReadMusic()}>예-readeMusic</button>
          ) : (
            <></>
          )}
          <button onClick={() => setOpenConfirm(false)}>아니오</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
