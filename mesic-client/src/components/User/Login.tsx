import axios from "axios";
import React, { useCallback, useState, useRef, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { editUserinfo, getAccessToken } from "../../actions/index";
import googleLogo from '../../images/google-login.png'
//axios.defaults.withCredentials = true;

function Login({
  openLogin,
  setOpenLogin,
  getUserInfo,
  setLoginController,
  deletePostMarkers,
}: any) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.userReducer);
  const { isLogin } = state.user;
  // const GOOGLE_LOGIN_API_URL = `${process.env.REACT_APP_SERVER_URL}/google/login`;
  const GOOGLE_LOGIN_API_URL = "http://localhost:4000/google/login";
  const LOGIN_URL = `${process.env.REACT_APP_SERVER_URL}/login`;
  const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&
redirect_uri=http://localhost:3000/mainpage&response_type=code&client_id=350695188416-sc4m6nro89c4sii03qm9qaeltqivnie3.apps.googleusercontent.com`;

  const responseLogin = () => {
    const loginData = { email: idInput, password: pwInput };
    setErrorMsg("");
    if (idInput.length === 0) {
      setPwError("");
      setEmailError("이메일을 입력하세요");
    } else if (pwInput.length === 0) {
      setPwError("비밀번호를 입력하세요");
    } else {
      axios
        .post(LOGIN_URL, loginData)
        .then((res) => {
          if (res.data.accessToken) {
            dispatch(getAccessToken(res.data.accessToken));
            getUserInfo(res.data.id);
            closeLogin();
          }
          return;
        })
        .catch((err) => {
          setErrorMsg("존재하지 않는 아이디이거나, 잘못된 비밀번호입니다");
          console.log(err);
        });
    }
  };

  const googleLoginHandler = () => {
    window.location.assign(GOOGLE_LOGIN_URL);
  };

  /*
  const { accessToken } = res.data
  const { name, profile, _id } = res.data._doc
  const data = {accessToken, name, profile, _id}
  */
  const getAuth = (authorizationCode: string) => {
    axios
      .post(GOOGLE_LOGIN_API_URL, { authorizationCode })
      .then((res) => res.data)
      .then((data) => {
        dispatch(getAccessToken(data.accessToken));
        dispatch(
          editUserinfo(
            data._doc._id,
            "google_login",
            data._doc.name,
            "google_login",
            data._doc.profile,
            data._doc.follow
          )
        );
      })
      .catch(() => {
        alert("서버오류로 로그인이 불가합니다.");
      });
  };

  useEffect(() => {
    if (!isLogin) {
      const url = new URL(window.location.href);
      const authorizationCode = url.searchParams.get("code");
      const googleCheck = window.location.href.indexOf("google");
      if (authorizationCode && googleCheck !== -1) {
        getAuth(authorizationCode);
      }
    }
  }, [isLogin]);

  const loginAsGuest = () => {
    const loginData = { email: "yatong@hahaha.com", password: "asdf1!" };
    axios.post(LOGIN_URL, loginData).then((res) => {
      if (res.data.accessToken) {
        dispatch(getAccessToken(res.data.accessToken));
        getUserInfo(res.data.id);
        closeLogin();
      }
      return;
    });
  };

  const closeLogin = () => {
    setOpenLogin(false);
    inputEmail.current.value = "";
    inputPw.current.value = "";
    setIdInput("");
    setPwInput("");
    // setLoginController(false);
    // deletePostMarkers();
  };

  const [idInput, setIdInput] = useState<string>("");
  const [pwInput, setPwInput] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [pwError, setPwError] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const inputEmail = useRef<any>();
  const inputPw = useRef<any>();

  const handleIdInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIdInput(e.target?.value);
      if (idInput.length > 0) {
        setEmailError("");
      }
    },
    [idInput]
  );

  const handlePwInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPwInput(e.target?.value);
      if (pwInput.length > 0) {
        setPwError("");
      }
    },
    [pwInput]
  );

  return (
    <div className={`background ${openLogin ? "show" : ""}`}>
      <div className="login-signup-modal-outsider" onClick={closeLogin} />
      <div className="login-signup-modal">
        <span className="login-close" onClick={closeLogin}>
          X
        </span>
        <div className="login-content">
          <div className="login-title">LOGIN</div>
          <div className="email-input-section">
            <span>Email</span>
            <input
              onChange={handleIdInput}
              type="text"
              name="email"
              ref={inputEmail}
            ></input>
            <div className="error-message">{emailError}</div>
          </div>
          <div className="password-input-section">
            <span>Password</span>
            <input
              onChange={handlePwInput}
              type="password"
              name="password"
              ref={inputPw}
            ></input>
            <div className="error-message">
              {emailError.length === 0 ? <>{pwError}</> : <></>}
            </div>
            {emailError.length === 0 && pwError.length === 0 ? (
              <>{errorMsg}</>
            ) : (
              <></>
            )}
          </div>
          <div>
            <button className="loginBtn-1" onClick={responseLogin}>Login</button>
            <button className="guestLoginBtn" onClick={loginAsGuest}>Guest</button>
          </div>
        </div>
        <div className="loginContainer" onClick={googleLoginHandler}>
          <img className="loginBtn" src={googleLogo} />
        </div>
      </div>
    </div>
  );
}

export default Login;
