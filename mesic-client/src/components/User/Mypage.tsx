import { profile } from "console";
import React from "react";
import { RootState } from "../../reducers";
import { useDispatch, useSelector } from "react-redux";

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
        <div className="mypage-edit-title">MYPAGE</div>
        <div className="mypage-edit-content">
          <div className="profileImg">
            <figure className="profileImg-outsider">
              <img className="profileImg-content" src={profileImg}></img>
            </figure>
          </div>
          <div>이메일: {email}</div>
          <div>이름: {name}</div>
          <div>닉네임: {nickname}</div>
          <div>
            {email !== "yatong@hahaha.com" ? (
              <button onClick={handleOpenEditMypage}>수정</button>
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
