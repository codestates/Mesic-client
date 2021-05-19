import React from "react";

type SignupProps = {
  openSignup: boolean;
  closeSignup: () => void;
};

function Signup(props: SignupProps) {
  const { openSignup, closeSignup } = props;

  const clickCloseSignup = () => {
    closeSignup();
  };

  return (
    <div
      className={`background ${openSignup ? "show1" : ""}`}
      onClick={clickCloseSignup}
    >
      <div className="login-signup-modal">
        <div className="signup-close" onClick={clickCloseSignup}>
          X
        </div>
        <div className="signup-content">
          <div className="signup-title">SIGNUP</div>
          <div>
            <input type="text" name="email"></input>
          </div>
          <div>
            <input type="text" name="name"></input>
          </div>
          <div>
            <input type="text" name="password"></input>
          </div>
          <div>
            <input type="text" name="check_password"></input>
          </div>
          <div>
            <button>Signup</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
