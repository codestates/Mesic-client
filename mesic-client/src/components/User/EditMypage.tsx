import axios from "axios";
import React, { useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import AWS from "aws-sdk";
import { EditMypageProps } from "../../props-types";

function EditMypage({
  setOpenMypage,
  openEditMypage,
  setOpenEditMypage,
  getUserInfo,
}: EditMypageProps) {
  const { user_id, token, email, name, nickname, profileImg } = useSelector(
    (state: RootState) => state.userReducer.user
  );

  const UPDATE_USER_URL = `${process.env.REACT_APP_SERVER_URL}/users/${user_id}`;
  const editProfileInput = useRef<HTMLInputElement>(null);
  const [editNicknameInput, setEditNicknameInput] = useState<string>("");
  const [editProfileImg, setEditProfileImg] = useState<any>("");
  const [editPreviewProfileImg, setEditPreviewProfileImg] = useState<any>("");
  const [nicknameError, setNicknameErrorr] = useState<string>("");
  const [isNicknameChanged, setIsNicknameChanged] = useState<boolean>(false);

  const accessKeyId = process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY_ID;
  const region = process.env.REACT_APP_AWS_S3_REGION;
  const bucket = process.env.REACT_APP_AWS_S3_BUCKET;
  const identity = process.env.REACT_APP_AWS_S3_IDENTITY_POOL_ID;
  const s3 = new AWS.S3({ accessKeyId, secretAccessKey, region });

  const sendModifiedData = () => {
    const param = {
      Bucket: `${bucket}`,
      Key: `image/${editProfileImg.name}`,
      ACL: "public-read",
      Body: editProfileImg,
      ContentType: "image/jpg",
    }; //s3 업로드에 필요한 옵션 설정

    s3.upload(param, function (err: any, data: any) {
      if (err) {
        console.log(err);
        return;
      }

      if (editNicknameInput.length === 0 && isNicknameChanged) {
        setNicknameErrorr("닉네임을 입력해주세요");
        return;
      }

      const updateData = {
        nickname: editNicknameInput.length > 0 ? editNicknameInput : nickname,
        profile: editProfileImg.name ? data.Location : profileImg,
      };

      axios
        .patch(UPDATE_USER_URL, updateData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            getUserInfo(user_id);
            setOpenEditMypage(false);
            setOpenMypage(true);
            setEditProfileImg("");
            if (editProfileInput.current?.value) {
              editProfileInput.current.value = "";
            }
          }
        })
        .catch((err) => console.log(err));
    });
  };

  const handleEditNicknameInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditNicknameInput(e.target?.value);
      if (editNicknameInput.length > 0) {
        setNicknameErrorr("");
      }
    },
    [editNicknameInput]
  );

  const handleEditProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      try {
        setEditPreviewProfileImg(URL.createObjectURL(file));
      } catch (error) {
        return;
      }
      setEditProfileImg(file);
    }
  };

  const handleReturnMypage = () => {
    setOpenEditMypage(false);
    setOpenMypage(true);
    setEditPreviewProfileImg(profileImg);
    setEditProfileImg(profileImg);
    setEditNicknameInput(nickname);
    if (editProfileInput.current?.value) {
      editProfileInput.current.value = "";
    }
  };

  const deleteProfile = () => {
    AWS.config.region = `${region}`;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: `${region}:${identity}`,
    });

    const file = profileImg.split("/");
    const fileName = file[file.length - 1];
    const param = {
      Bucket: `${bucket}`,
      Key: `image/${fileName}`,
    }; //s3 업로드에 필요한 옵션 설정

    s3.deleteObject(param, function (err: any, data: any) {
      if (err) {
        console.log(err);
        return;
      }
      const updateData = {
        nickname: nickname,
        profile: "",
      };

      axios
        .patch(
          `${process.env.REACT_APP_SERVER_URL}/users/${user_id}`,
          updateData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          getUserInfo(user_id);
          setOpenEditMypage(false);
          setOpenMypage(true);
          setEditProfileImg("");
          setEditPreviewProfileImg("");
          if (editProfileInput.current?.value) {
            editProfileInput.current.value = "";
          }
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <>
      <div
        onClick={() => {
          handleReturnMypage();
          setOpenMypage(false);
          setOpenEditMypage(false);
        }}
        className={`mypage-edit-background ${openEditMypage ? "show" : ""}`}
      />
      <div className={`mypage-edit-modal ${openEditMypage ? "show" : ""}`}>
        <div
          className="mypage-close"
          onClick={() => {
            handleReturnMypage();
            setOpenMypage(false);
            setOpenEditMypage(false);
          }}
        >
          X
        </div>
        <div className="editmypage-content">
          <div className="mypage-title">EDIT MYPAGE</div>
          <div className="profileImg">
            <figure>
              <img
                className="profileImg-content"
                src={
                  editPreviewProfileImg.length > 0
                    ? editPreviewProfileImg
                    : profileImg
                }
              />
            </figure>
            <label htmlFor="profile-img-input">
              <i className="fas fa-pencil-alt edit-profile-img-btn" />
            </label>
            <input
              id="profile-img-input"
              ref={editProfileInput}
              type="file"
              accept="image/*"
              onChange={handleEditProfile}
            />
            <i
              className="fa fa-trash del-profile"
              aria-hidden="true"
              onClick={deleteProfile}
            />
          </div>
          <div className="mypage-info">
            <div className="edit-email">
              <div className="mypage-email-edit-index">Email </div>
              <div className="mypage-email-edit-content">{email}</div>
            </div>
            <div className="edit-name">
              <div className="mypage-name-edit-index">Name </div>
              <div className="mypage-name-edit-content">{name}</div>
            </div>
            <div className="edit-nickname">
              <div className="mypage-nickname-edit-index">Nickname </div>
              <input
                type="text"
                defaultValue={
                  editNicknameInput.length > 0 ? editNicknameInput : nickname
                }
                onInput={() => setIsNicknameChanged(true)}
                onChange={handleEditNicknameInput}
              />
            </div>
          </div>
          <div className="error-message">{nicknameError}</div>
          <div className="mypage-edit-button-section">
            <button className="mypage-modify-btn" onClick={sendModifiedData}>
              저장
            </button>
            <button className="mypage-cancel-btn" onClick={handleReturnMypage}>
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditMypage;
