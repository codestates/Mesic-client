import axios from "axios";
import { profile } from "console";
import React, { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import AWS from "aws-sdk";


function EditMypage({
  setOpenMypage,
  profileImg,
  email,
  name,
  nickname,
  openEditMypage,
  setOpenEditMypage,
  getUserInfo,
}: any) {
  const state = useSelector((state: RootState) => state);
  const { user_id, token } = state.userReducer.user;

  const UPDATE_USER_URL = `${process.env.REACT_APP_SERVER_URL}/users/${user_id}`;

  const editProfileInput = useRef<any>();
  const [editNicknameInput, setEditNicknameInput] = useState<string>("");
  const [editProfileImg, setEditProfileImg] = useState<any>("");
  const [editPreviewProfileImg, setEditPreviewProfileImg] = useState<any>("");
  const [nicknameError, setNicknameErrorr] = useState<string>("");

  const sendModifiedData = () => {

    const accessKeyId = 'AKIA2XC7TYWAUO3P7L2I';
    const secretAccessKey = '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';
    const region = 'ap-northeast-2'
    
    const s3 = new AWS.S3({ accessKeyId, secretAccessKey, region }); //s3 configuration

    const param = {
      Bucket: 'mesic-photo-bucket',
      Key: `/image/${editProfileImg.name}`,
      ACL: "public-read",
      Body: editProfileImg,
      ContentType: "image/jpg"
    }; //s3 업로드에 필요한 옵션 설정

    s3.upload(param, function (err: any, data: any) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("data.Location", data.Location);
      const updateData = { nickname: editNicknameInput, profile: data.Location };
      console.log(updateData);
      
      if (editNicknameInput.length === 0) {
        setNicknameErrorr("닉네임을 입력해주세요");
        return;
      }
      
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
    })
  }

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
    setEditPreviewProfileImg(URL.createObjectURL(file))
    setEditProfileImg(file);
  };

  const handleReturnMypage = () => {
    setOpenEditMypage(false);
    setOpenMypage(true);
    editProfileInput.current.value = "";
    setEditProfileImg(profileImg);
    setEditNicknameInput(nickname);
  };

  return (
    <div className={`mypage-edit-background ${openEditMypage ? "show" : ""}`}>
      <div className="mypage-edit-modal">
        <div
          className="editmypage-close"
          onClick={() => setOpenEditMypage(false)}
        >
          X
        </div>
        <div className="mypage-title">EDIT MYPAGE</div>
        <div className="editmypage-content">
          <div className="profileImg">
            <figure className="profileImg-outsider">
              {editProfileImg.length > 0 ? (
                <img className="profileImg-content" src={editPreviewProfileImg}></img>
              ) : (
                <img className="profileImg-content" src={profileImg}></img>
              )}
            </figure>
            <div>
              <input
                ref={editProfileInput}
                type="file"
                accept="image/*"
                onChange={handleEditProfile}
              ></input>
            </div>
          </div>
          <div className="edit-email">이메일: {email}</div>
          <div className="edit-name">이름: {name}</div>
          <div className="edit-nickname">
            닉네임:
            <input
              type="text"
              defaultValue={
                editNicknameInput.length > 0 ? editNicknameInput : nickname
              }
              onChange={handleEditNicknameInput}
            ></input>
            <div>{nicknameError}</div>
          </div>
          <div>
            <button onClick={sendModifiedData}>저장</button>
            <button onClick={handleReturnMypage}>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMypage;