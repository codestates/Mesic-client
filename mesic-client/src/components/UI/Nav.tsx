import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import Login from "../User/Login";
import Signup from "../User/Signup";
import Mypage from "../User/Mypage";
import EditMypage from "../User/EditMypage";
import {
  clearUserInfo,
  clearModeState,
  editUserinfo,
  getAccessToken,
} from "../../actions/index";
import logo from "../../images/mesic-logo.png";

function Nav({ loginController, setLoginController, deletePostMarkers }: any) {
  //const {open} = props;
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { isLogin, email, name, nickname, profileImg, user_id }: any =
    state.userReducer.user;

  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openSignup, setOpenSignup] = useState<boolean>(false);
  const [openMypage, setOpenMypage] = useState<boolean>(false);
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
          dispatch(clearUserInfo());
          dispatch(clearModeState());
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
        console.log("getUserInfo : ", res.data);
        const { email, follow, name, nickname, _id, profile } = res.data;
        dispatch(editUserinfo(_id, email, name, nickname, profile, follow));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loginController) {
      setOpenLogin(true);
      setLoginController(false);
      deletePostMarkers();
    }
    return;
  }, [loginController]);

  return (
    <div>
      <Login
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
        getUserInfo={getUserInfo}
        setLoginController={setLoginController}
        deletePostMarkers={deletePostMarkers}
      />
      <Signup
        openSignup={openSignup}
        setOpenSignup={setOpenSignup}
        getUserInfo={getUserInfo}
      />
      <Mypage
        openMypage={openMypage}
        closeMypage={closeMypage}
        openEditMypage={openEditMapage}
        setOpenEditMypage={setOpenEditMypage}
      />
      <EditMypage
        setOpenMypage={setOpenMypage}
        openEditMypage={openEditMapage}
        setOpenEditMypage={setOpenEditMypage}
        getUserInfo={getUserInfo}
      />
      <div className="nav">
        <Link to="/">
          <img
            src={logo}
            className="logo-btn"
            onClick={() => dispatch(clearModeState())}
          />
        </Link>
        <div className="nav-btn">
          <button
            className="loginBtn"
            onClick={isLogin ? clickLogout : clickLogin}
          >
            {isLogin ? "Logout" : "Login"}
          </button>
          <button
            className="mypageBtn"
            onClick={isLogin ? clickMypage : clickSignup}
          >
            {isLogin ? "Mypage" : "Signup"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
