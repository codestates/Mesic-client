import axios from "axios";
import React, { useCallback, useState } from "react";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

type SignupProps = {
  openSignup: boolean;
  closeSignup: () => void;
  email: string;
  name: string;
  nickname: string;
};

function Signup(props: SignupProps) {
  const { openSignup, closeSignup } = props;

  const SIGNUP_URL = "http://localhost:4000/users/signup";
 
  const validateEmail = (email:string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  const validatePassword = (pwInput: string, pwCheckInput: string) => {  
    // 확인 비밀번호와 같은지 비교
    if(pwInput !== pwCheckInput){
      return false;
    }
    const minNumberofChars = 6;
    const maxNumberofChars = 16;
    // 정규표현식
    const regularExpression  = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/; 

    // 글자수가 6자 이상 16자 이하인지 확인
    if(pwInput.length < minNumberofChars || pwInput.length > maxNumberofChars){
      return false;
    }

    // 정규표현식에 들어가는지 확인
    if(!regularExpression.test(pwInput)) {
      alert("password should contain atleast one number and one special character");
      return false;
    }
    return true;
  }

  const responseSignup = () => {

    console.log(pwInput)
    const email = validateEmail(idInput)? idInput: console.error("invalid")
    const password = validatePassword(pwInput, pwCheckInput)? pwInput: console.error("invalid");
    const signupData = {
      "profile": "jennie.jpg", // 회원가입할때 사진넣는 거 추가해야함.
      "email": email,
      "password": password,
      "name": nameInput,
      "nickname": nicknameInput,
      "follow":[],
      "refreshToken":""

    }
    console.log(signupData)
    axios.post(SIGNUP_URL, signupData)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  }

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
            <button onClick={responseSignup}>Signup</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
