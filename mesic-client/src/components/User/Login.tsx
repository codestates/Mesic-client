import axios from "axios";
import React, { useCallback, useState, useRef } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { editUserinfo, getAccessToken } from "../../actions/index";
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

  const GOOGLE_LOGIN_URL = `${process.env.REACT_APP_SERVER_URL}/google/login`;
  const LOGIN_URL = `${process.env.REACT_APP_SERVER_URL}/login`;

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

  const responseGoogle = (response: any) => {
    const { accessToken, profileObj } = response;
    const userinfo = {
      accessToken,
      email: profileObj.email,
      profile: profileObj.imageUrl,
      name: profileObj.name,
    };
    sendData(userinfo); //accessToken 이거 받아서 사용해주세요
  };

  const sendData = (data: Object) => {
    axios
      .post(GOOGLE_LOGIN_URL, data)
      .then((res) => {
        console.log("googleLogin === ", res);
      })
      .catch((err) => console.log(err));
  };

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
          <div>
            <span>e-mail</span>
            <input
              onChange={handleIdInput}
              type="text"
              name="email"
              ref={inputEmail}
            ></input>
            <div className="error-message">{emailError}</div>
          </div>
          <div>
            <span>password</span>
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
            <button onClick={responseLogin}>Login</button>
            <button onClick={loginAsGuest}>Guest로그인</button>
          </div>
        </div>
        <GoogleLogin
          clientId="350695188416-sc4m6nro89c4sii03qm9qaeltqivnie3.apps.googleusercontent.com"
          buttonText="Google Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}

export default Login;
