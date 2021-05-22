import React, { useCallback, useState } from "react";

type LoginProps = {
  openLogin: boolean;
  closeLogin: () => void;
};

function Login(props: LoginProps) {
  const { openLogin, closeLogin } = props;

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
            <button>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
