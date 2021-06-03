import axios from "axios";
import React, { useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import AWS from "aws-sdk";

function EditMypage({
  setOpenMypage,
  openEditMypage,
  setOpenEditMypage,
  getUserInfo,
}: any) {
  const { user_id, token, email, name, nickname, profileImg } = useSelector(
    (state: RootState) => state.userReducer.user
  );

  const UPDATE_USER_URL = `${process.env.REACT_APP_SERVER_URL}/users/${user_id}`;
  const editProfileInput = useRef<any>();
  const [editNicknameInput, setEditNicknameInput] = useState<string>("");
  const [editProfileImg, setEditProfileImg] = useState<any>("");
  const [editPreviewProfileImg, setEditPreviewProfileImg] = useState<any>("");
  const [nicknameError, setNicknameErrorr] = useState<string>("");
  const [isNicknameChanged, setIsNicknameChanged] = useState<boolean>(false);

  const sendModifiedData = () => {
    const accessKeyId = "AKIA2XC7TYWAUO3P7L2I";
    const secretAccessKey = "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";
    const region = "ap-northeast-2";

    const s3 = new AWS.S3({ accessKeyId, secretAccessKey, region }); //s3 configuration

    const param = {
      Bucket: "mesic-photo-bucket",
      Key: `/image/${editProfileImg.name}`,
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

      console.log("data.Location", data.Location);

      const updateData = {
        nickname: editNicknameInput.length > 0 ? editNicknameInput : nickname,
        profile: editProfileImg.name ? data.Location : profileImg,
      };

      console.log(updateData);

      axios
        .patch(UPDATE_USER_URL, updateData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("patchuser === ", res);
          if (res.status === 200) {
            getUserInfo(user_id);
            setOpenEditMypage(false);
            setOpenMypage(true);
            editProfileInput.current.value = "";
            setEditProfileImg("");
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

  const handleEditProfile = (e: any) => {
    const file = e.target.files[0];
    try {
      setEditPreviewProfileImg(URL.createObjectURL(file));
    } catch (error) {
      return;
    }
    setEditProfileImg(file);
  };

  const handleReturnMypage = () => {
    setOpenEditMypage(false);
    setOpenMypage(true);
    editProfileInput.current.value = "";
    setEditPreviewProfileImg(profileImg);
    setEditProfileImg(profileImg);
    setEditNicknameInput(nickname);
  };

  return (
    <div className={`mypage-edit-background ${openEditMypage ? "show" : ""}`}>
      <div className="mypage-edit-modal">
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
              {editPreviewProfileImg.length > 0 ? (
                <img
                  className="profileImg-content"
                  src={editPreviewProfileImg}
                ></img>
              ) : (
                <img className="profileImg-content" src={profileImg}></img>
              )}
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
              ></input>
            </div>
          </div>
          <div className="nickname-error">{nicknameError}</div>
          <div className="mypage-edit-button-section">
            <button className="mypage-modify-btn" onClick={sendModifiedData}>
              저장
            </button>
            <button className="mypage-modify-btn" onClick={handleReturnMypage}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMypage;
