import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { createNoSubstitutionTemplateLiteral } from "typescript";
import { RootState } from "../../reducers";
import ConfirmModal from "..//UI/ConfirmModal";
import axios from "axios";
import AWS from "aws-sdk";

function ReadPhoto({ readImg, setReadImg, markerId, setPinUpdate }: any) {
  const state = useSelector((state: RootState) => state);
  const { isLogin, token } = state.userReducer.user;
  const { mode } = state.modeReducer.user;

  const editedImageInput = useRef<any>();

  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [editedImg, setEditedImg] = useState<any>("");
  const [editedPreviewImg, setEditedPreviewImg] = useState<any>("");
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const splitArr = readImg.split("/");
  const fileName = splitArr[splitArr.length - 1];

  const handleEditedImg = (e: any) => {
    setUpdateMode(true);
    setEditedImg(e.target.files[0]);
    setEditedPreviewImg(URL.createObjectURL(e.target.files[0]));
    editedImageInput.current.value = "";
  };
  const updateReadImg = () => {
    //s3에 업데이트 후 서버로 patch요청, 다시 get요청

    const accessKeyId = "AKIA2XC7TYWAUO3P7L2I";
    const secretAccessKey = "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";
    const region = "ap-northeast-2";

    const s3 = new AWS.S3({ accessKeyId, secretAccessKey, region }); //s3 configuration

    const param = {
      Bucket: "mesic-photo-bucket",
      Key: `image/${editedImg.name}`,
      ACL: "public-read",
      Body: editedImg,
      ContentType: "image/jpg",
    }; //s3 업로드에 필요한 옵션 설정

    s3.upload(param, function (err: any, data: any) {
      if (err) {
        console.log(err);
        return;
      }
      //console.log("data.Location", data.Location);

      const updateData = {
        photo: data.Location,
      };
      console.log("sending to update : ", updateData);

      axios
        .patch(
          `${process.env.REACT_APP_SERVER_URL}/photos/${markerId}`,
          updateData,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          //console.log("patch photo", res);
          setEditedImg("");
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
        {updateMode ? (
          <div>
            <div className="post-icon">
              <i className="fa fa-camera"></i>
            </div>
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
              <img className="photo-img" src={editedPreviewImg} />
            </div>
            <div className="save-cancel-btn">
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
          <div className="read-mode-photo">
            {isLogin && mode !== "WATCH" ? (
              fileName !== "undefined" ? (
                <>
                  <div className="edit-del-btn">
                    <i className="fa fa-camera"></i>
                    <div>
                      <label className="edit-btn-photo" htmlFor="photo-file">
                        <i className="fas fa-pencil-alt"></i>
                      </label>
                      <input
                        className="input-photo"
                        ref={editedImageInput}
                        type="file"
                        id="photo-file"
                        accept="image/*"
                        onChange={handleEditedImg}
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
                    <img className="photo-img" src={readImg} />
                  </div>
                </>
              ) : (
                <>
                  <div className="post-icon">
                    <i className="fa fa-camera"></i>
                  </div>
                  <div className="detail-line"></div>
                  <div className="add-btn-outsider">
                    <label className="add-btn-read-photo" htmlFor="photo-file">
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
                  </div>
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
