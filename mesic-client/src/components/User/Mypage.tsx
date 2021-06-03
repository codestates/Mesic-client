import { profile } from "console";
import React from "react";
import { RootState } from "../../reducers";
import { useDispatch, useSelector } from "react-redux";
import profileImage from "../../images/avatar.png";

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
        <div>
          <div className="mypage-title">MYPAGE</div>
          <div className="profileImg">
            <figure>
              <img src={profileImage}></img>
            </figure>
          </div>
          <div className="mypage-info">
            <div>
              <div>Email </div>
              <div>{email}</div>
            </div>
            <div>
              <div>Name </div>
              <div>{name}</div>
            </div>
            <div>
              <div>Nickname </div>
              <div>{nickname}</div>
            </div>
          </div>
          <div className="mypage-modify-btn-section">
            {email !== "yatong@hahaha.com" ? (
              <button
                className="mypage-modify-btn"
                onClick={handleOpenEditMypage}
              >
                수정
              </button>
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
