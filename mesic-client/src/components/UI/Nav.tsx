import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import Login from "../User/Login";
import Signup from "../User/Signup";
import Mypage from "../User/Mypage";
import EditMypage from "../User/EditMypage";
import { logout, editUserinfo, getAccessToken } from "../../actions/index";

function Nav() {
  //const {open} = props;
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const basicImg =
    "https://pbs.twimg.com/media/EhIO_LyVoAA2szZ?format=jpg&name=small";
  const { isLogin, email, name, nickname, profileImg, user_id } =
    state.userReducer.user;
  const { mode } = state.modeReducer.user;

  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openSignup, setOpenSignup] = useState<boolean>(false);
  const [openMypage, setOpenMypage] = useState<boolean>(false);
  //const [profileImg, setProfileImg] = useState<any>(null);
  // const [email, setEmail] = useState<string>("");
  // const [name, setName] = useState<string>("");
  // const [nickname, setNickname] = useState<string>("");
  const [openEditMapage, setOpenEditMypage] = useState<boolean>(false);

  const clickLogin = () => {
    setOpenLogin(true);
  };

  const clickLogout = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/users/logout/${user_id}`)
      .then((res) => {
        //console.log("logout ===", res);
        if (res.data.message === "seucess") {
          dispatch(logout());
        } else {
          console.log("failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clickSignup = () => {
    setOpenSignup(true);
  };
  const clickMypage = () => {
    setOpenMypage(true);
  };
  const closeMypage = () => {
    setOpenMypage(false);
  };

  const getUserInfo = (user_id: string) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users/${user_id}`)
      .then((res) => {
        const { email, follow, name, nickname, _id } = res.data;
        dispatch(editUserinfo(_id, email, name, nickname, follow));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Login
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
        getUserInfo={getUserInfo}
      ></Login>
      <Signup
        openSignup={openSignup}
        setOpenSignup={setOpenSignup}
        email={email}
        name={name}
        nickname={nickname}
        getUserInfo={getUserInfo}
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
