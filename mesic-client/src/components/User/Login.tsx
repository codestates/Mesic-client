import axios from "axios";
import React, { useCallback, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { editUserinfo, getAccessToken } from "../../actions/index";
import googleLogo from "../../images/google-login.png";
import { LoginProps } from "../../state-types";

function Login({ openLogin, setOpenLogin, getUserInfo }: LoginProps) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.userReducer);
  const { isLogin } = state.user;
  // const GOOGLE_LOGIN_API_URL = `${process.env.REACT_APP_SERVER_URL}/google/login`;
  const GOOGLE_LOGIN_API_URL = "http://localhost:4000/google/login";
  const LOGIN_URL = `${process.env.REACT_APP_SERVER_URL}/login`;
  const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&
redirect_uri=http://localhost:3000/mainpage&response_type=code&client_id=350695188416-sc4m6nro89c4sii03qm9qaeltqivnie3.apps.googleusercontent.com`;

  const [idInput, setIdInput] = useState<string>("");
  const [pwInput, setPwInput] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [pwError, setPwError] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPw = useRef<HTMLInputElement>(null);

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
    const loginData = { email: "guest@codestates.com", password: "asdf1!" };
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
    if (inputEmail.current && inputPw.current) {
      inputEmail.current.value = "";
      inputPw.current.value = "";
    }
    setIdInput("");
    setPwInput("");
  };

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
    <div className={`background ${openLogin && "show"}`}>
      <div className="login-signup-modal-outsider" onClick={closeLogin} />
      <div className="login-signup-modal">
        <span className="login-close" onClick={closeLogin}>
          X
        </span>
        <div className="login-title">LOGIN</div>
        <div className="content-flex">
          <div className="login-content">
            <div className="email-input-section">
              <div>Email</div>
              <input
                onChange={handleIdInput}
                type="text"
                name="email"
                ref={inputEmail}
              />
            </div>
            <div className="password-input-section">
              <div>Password</div>
              <input
                onChange={handlePwInput}
                type="password"
                name="password"
                ref={inputPw}
              />
            </div>
          </div>
        </div>
        <div className="error-message">
          {emailError.length === 0 ? `${pwError}` : `${emailError}`}
        </div>
        <button className="loginBtn-2" onClick={responseLogin}>
          Login
        </button>
        <button className="guestLoginBtn" onClick={loginAsGuest}>
          Guest
        </button>
        <div className="loginContainer">
          <div>
            <img
              className="google-loginBtn"
              onClick={googleLoginHandler}
              src={googleLogo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
