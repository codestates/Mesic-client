import { profile } from "console";
import React, { useState, useCallback, useRef } from "react";

type EditMypageProps = {
  setOpenMypage: (state: boolean) => void;
  profileImg: any;
  basicImg: string;
  email: string;
  name: string;
  nickname: string;
  openEditMypage: boolean;
  setOpenEditMypage: (state: boolean) => void;
  setProfileImg: (state: string) => void;
};

function EditMypage(props: EditMypageProps) {
  const {
    setOpenMypage,
    profileImg,
    basicImg,
    email,
    name,
    nickname,
    openEditMypage,
    setOpenEditMypage,
    setProfileImg,
  } = props;

  const editProfileInput = useRef<any>();
  const [editNicknameInput, setEditNicknameInput] = useState<string>(nickname);
  const [editProfileImg, setEditProfileImg] = useState<any>(null);

  const handleEditNicknameInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditNicknameInput(e.target?.value);
    },
    [editNicknameInput]
  );
  const handleEditProfile = (e: any) => {
    const blobData = [];
    blobData.push(e.target.files[0]);
    setEditProfileImg(window.URL.createObjectURL(new Blob(blobData)));
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
              {editProfileImg !== null ? (
                <img className="profileImg-content" src={editProfileImg}></img>
              ) : profileImg !== null ? (
                <img className="profileImg-content" src={profileImg}></img>
              ) : (
                <img className="profileImg-content" src={basicImg}></img>
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
              value={editNicknameInput}
              onChange={handleEditNicknameInput}
            ></input>
          </div>
          <div>
            <button>Edit</button>
            <button onClick={handleReturnMypage}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMypage;
