import axios from "axios";
import React, { useCallback, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { editUserinfo, getAccessToken } from "../../actions/index";

type LoginProps = {
  //interface
  openLogin: boolean;
  closeLogin: () => void;
};

function Login(props: LoginProps) {
  const { openLogin, closeLogin } = props;

  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.userReducer);

  const GOOGLE_LOGIN_URL = `${process.env.REACT_APP_SERVER_URL}/google/login`;
  const LOGIN_URL = `${process.env.REACT_APP_SERVER_URL}/login`;

  const responseLogin = () => {
    const loginData = { email: idInput, password: pwInput };
    axios
      .post(LOGIN_URL, loginData)
      .then((res) => {
        console.log("login === ", res);
        dispatch(getAccessToken(res.data.accessToken));
        getUserInfo(res.data.id);
      })
      .catch((err) => console.log(err));
  };
  const getUserInfo = (user_id: string) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users/${user_id}`)
      .then((res) => {
        //console.log(res)
        const { email, follow, name, nickname, _id } = res.data;
        dispatch(editUserinfo(_id, email, name, nickname, follow));
        closeLogin();
      })
      .catch((err) => console.log(err));
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

  const clickCloseLogin = () => {
    closeLogin();
  };

  const [idInput, setIdInput] = useState<string>("");
  const [pwInput, setPwInput] = useState<string>("");

  const handleIdInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIdInput(e.target?.value);
    },
    [idInput]
  );

  const handlePwInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPwInput(e.target?.value);
    },
    [pwInput]
  );

  return (
    <div className={`background ${openLogin ? "show" : ""}`}>
      <div className="login-signup-modal-outsider" onClick={clickCloseLogin} />
      <div className="login-signup-modal">
        <span className="login-close" onClick={clickCloseLogin}>
          X
        </span>
        <div className="login-content">
          <div className="login-title">LOGIN</div>
          <div>
            <span>e-mail</span>
            <input onChange={handleIdInput} type="text" name="email"></input>
          </div>
          <div>
            <span>password</span>
            <input
              onChange={handlePwInput}
              type="password"
              name="password"
            ></input>
          </div>
          <div>
            <button onClick={responseLogin}>Login</button>
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
