import { profile } from "console";
import React from "react";
import { RootState } from "../../reducers";
import { useDispatch, useSelector } from "react-redux";
import profileImage from '../../images/avatar.png';

type MypageProps = {
  openMypage: boolean;
  closeMypage: () => void;
  profileImg: any;
  email: string;
  name: string;
  nickname: string;
  openEditMypage: boolean;
  setOpenEditMypage: (state: boolean) => void;
};

function Mypage(props: MypageProps) {
  const state = useSelector((state: RootState) => state.userReducer);

  const {
    openMypage,
    closeMypage,
    profileImg,
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
        <div className="mypage-content">
          <div className="mypage-title">MYPAGE</div>
          <div className="profileImg">
            <figure className="profileImg-outsider">
              <img className="profileImg-content" src={profileImage}></img>
            </figure>
          </div>
          <div className="mypage-email-section">
            <span className="mypage-email-index">Email </span> 
            <span className="mypage-email-content">{email}</span>
          </div>
          <div className="mypage-name-section">
            <span className="mypage-name-index">Name </span> 
            <span className="mypage-name-content">{name}</span>
          </div>
          <div className="mypage-nickname-section">
            <span className="mypage-nickname-index">Nickname </span> 
            <span className="mypage-nickname-content">{nickname}</span>
          </div>
          <div className="mypage-modify-btn-section">
            {email !== "yatong@hahaha.com" ? (
              <button className="mypage-modify-btn" onClick={handleOpenEditMypage}>수정</button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
