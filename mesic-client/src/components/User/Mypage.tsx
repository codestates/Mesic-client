import { profile } from "console";
import React from "react";

type MypageProps = {
  openMypage: boolean;
  closeMypage: () => void;
  profileImg: any;
  basicImg: string;
  email: string;
  name: string;
  nickname: string;
  openEditMypage: boolean;
  setOpenEditMypage: (state: boolean) => void;
};

function Mypage(props: MypageProps) {
  const {
    openMypage,
    closeMypage,
    profileImg,
    basicImg,
    email,
    name,
    nickname,
    openEditMypage,
    setOpenEditMypage,
  } = props;

  const clickCloseMypage = () => {
    closeMypage();
  };
  const handleOpenEditMypage = () => {
    closeMypage();
    setOpenEditMypage(true);
  };

  return (
    <div className={`mypage-edit-background ${openMypage ? "show" : ""}`}>
      <div className="mypage-edit-modal">
        <div className="mypage-close" onClick={clickCloseMypage}>
          X
        </div>
        <div className="mypage-edit-title">MYPAGE</div>
        <div className="mypage-edit-content">
          <div className="profileImg">
            <figure className="profileImg-outsider">
              {profileImg !== null ? (
                <img className="profileImg-content" src={profileImg}></img>
              ) : (
                <img className="profileImg-content" src={basicImg}></img>
              )}
            </figure>
          </div>
          <div>이메일: {email}</div>
          <div>이름: {name}</div>
          <div>닉네임: {nickname}</div>
          <div>
            <button onClick={handleOpenEditMypage}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
