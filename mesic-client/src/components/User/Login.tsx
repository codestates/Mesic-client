import React from "react";

type LoginProps = {
  openLogin: boolean;
  closeLogin: () => void;
};

function Login(props: LoginProps) {
  const {openLogin, closeLogin} = props;

  const clickCloseLogin = () => {
    closeLogin();
  };

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
            <input type="text" name="email"></input>
          </div>
          <div>
            <input type="text" name="password"></input>
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
