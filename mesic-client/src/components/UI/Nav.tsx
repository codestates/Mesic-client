import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import Login from "../User/Login";
import Signup from "../User/Signup";
import Mypage from "../User/Mypage";
import EditMypage from "../User/EditMypage";

function Nav() {
  //const {open} = props;
  const state = useSelector((state: RootState) => state.userReducer);
  const basicImg =
    "https://pbs.twimg.com/media/EhIO_LyVoAA2szZ?format=jpg&name=small";
  const { isLogin } = state.user;

  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openSignup, setOpenSignup] = useState<boolean>(false);
  const [openMypage, setOpenMypage] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<any>(null);
  const [email, setEmail] = useState<string>("port757@codestates.com");
  const [name, setName] = useState<string>("secret");
  const [nickname, setNickname] = useState<string>("secret");
  const [openEditMapage, setOpenEditMypage] = useState<boolean>(false);

  const clickLogin = () => {
    setOpenLogin(true);
  };
  const closeLogin = () => {
    setOpenLogin(false);
  };
  const clickLogout = () => {
    //서버 logout 요청
  };
  const clickSignup = () => {
    setOpenSignup(true);
  };
  const closeSignup = () => {
    setOpenSignup(false);
  };
  const clickMypage = () => {
    setOpenMypage(true);
  };
  const closeMypage = () => {
    setOpenMypage(false);
  };

  return (
    <div>
      <Login openLogin={openLogin} closeLogin={closeLogin}></Login>
      <Signup
        openSignup={openSignup}
        closeSignup={closeSignup}
        email={email}
        name={name}
        nickname={nickname}
      ></Signup>
      <Mypage
        openMypage={openMypage}
        closeMypage={closeMypage}
        profileImg={profileImg}
        basicImg={basicImg}
        email={email}
        name={name}
        nickname={nickname}
        openEditMypage={openEditMapage}
        setOpenEditMypage={setOpenEditMypage}
      ></Mypage>
      <EditMypage
        setOpenMypage={setOpenMypage}
        profileImg={profileImg}
        basicImg={basicImg}
        email={email}
        name={name}
        nickname={nickname}
        openEditMypage={openEditMapage}
        setOpenEditMypage={setOpenEditMypage}
        setProfileImg={setProfileImg}
      ></EditMypage>
      <div className="nav">
        <Link to="/">
          <button className="logo-btn">Logo</button>
        </Link>
        <div className="nav-btn">
          <button onClick={isLogin ? clickLogout : clickLogin}>
            {isLogin ? "Logout" : "Login"}
          </button>
          <button onClick={isLogin ? clickMypage : clickSignup}>
            {isLogin ? "Mypage" : "Signup"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
