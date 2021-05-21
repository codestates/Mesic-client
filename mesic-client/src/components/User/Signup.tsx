import React, { useCallback, useState } from "react";

type SignupProps = {
  openSignup: boolean;
  closeSignup: () => void;
};

function Signup(props: SignupProps) {
  const { openSignup, closeSignup } = props;

  const clickCloseSignup = () => {
    closeSignup();
  };

  const [idInput, setIdInput] = useState<string>("");
  const [pwInput, setPwInput] = useState<string>("");
  const [pwCheckInput, setPwCheckInput] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [nicknameInput, setNicknameInput] = useState<string>("");

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

  const handlePwCheckInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPwCheckInput(e.target?.value);
    },
    [pwCheckInput]
  );

  const handleNameInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNameInput(e.target?.value);
    },
    [nameInput]
  );

  const handleNicknameInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNicknameInput(e.target?.value);
    },
    [nicknameInput]
  );

  return (
    <div className={`background ${openSignup ? "show" : ""}`}>
      <div className="login-signup-modal-outsider" onClick={clickCloseSignup} />
      <div className="login-signup-modal">
        <span className="signup-close" onClick={clickCloseSignup}>
          X
        </span>
        <div className="signup-content">
          <div className="signup-title">SIGNUP</div>
          <div>
            <span>e-mail</span>
            <input onChange={handleIdInput} type="text" name="email"></input>
          </div>
          <div>
            <span>name</span>
            <input onChange={handleNameInput} type="text" name="name"></input>
          </div>
          <div>
            <span>nickname</span>
            <input
              onChange={handleNicknameInput}
              type="text"
              name="nickname"
            ></input>
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
            <span>password check</span>
            <input
              onChange={handlePwCheckInput}
              type="password"
              name="check_password"
            ></input>
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
