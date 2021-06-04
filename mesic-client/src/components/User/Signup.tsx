import axios from "axios";
import React, { useCallback, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { getAccessToken } from "../../actions/index";

function Signup({ openSignup, setOpenSignup, getUserInfo }: any) {
  const SIGNUP_URL = `${process.env.REACT_APP_SERVER_URL}/users/signup`;
  const LOGIN_URL = `${process.env.REACT_APP_SERVER_URL}/login`;
  const dispatch = useDispatch();

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(email).toLowerCase());
    if (!isValid) {
      setEmailError("이메일을 다시 확인해주세요");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (pwInput: string, pwCheckInput: string) => {
    // 확인 비밀번호와 같은지 비교
    if (pwInput !== pwCheckInput) {
      setPwError("비밀번호를 다시 확인해주세요");
      return false;
    }
    const minNumberofChars = 6;
    const maxNumberofChars = 16;
    // 정규표현식
    const regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    // 글자수가 6자 이상 16자 이하인지 확인
    if (
      pwInput.length < minNumberofChars ||
      pwInput.length > maxNumberofChars
    ) {
      setPwError("비밀번호는 6자 이상 16자 이하입니다.");
      return false;
    }

    // 정규표현식에 들어가는지 확인
    if (!regularExpression.test(pwInput)) {
      setPwError("하나 이상의 숫자와 특수문자가 포함되어야 합니다");
      return false;
    } else {
      setPwError("");
      return true;
    }
  };

  const responseSignup = () => {
    // const email = validateEmail(idInput) ? idInput : emailError;
    // const password = validatePassword(pwInput, pwCheckInput)
    //   ? pwInput
    //   : pwError;
    const signupData = {
      email: idInput,
      password: pwInput,
      name: nameInput,
      nickname: nicknameInput,
      profile: "",
      follow: [],
      refreshToken: "",
    };
    //console.log(signupData);
    const validEmail = validateEmail(idInput);
    const validPw = validatePassword(pwInput, pwCheckInput);
    if (validEmail && validPw) {
      axios
        .post(SIGNUP_URL, signupData)
        .then((res) => {
          console.log("signup  ===", res);
          if (res.status === 201) {
            //closeSignup();
            axios
              .post(LOGIN_URL, {
                email: res.data.email,
                password: res.data.password,
              })
              .then((res) => {
                console.log("login after signup === ", res);
                if (res.data.accessToken) {
                  dispatch(getAccessToken(res.data.accessToken));
                  getUserInfo(res.data.id);
                  closeSignup();
                }
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => {
          console.log(err);
          setEmailError("이미 존재하는 이메일입니다.");
        });
    } else {
      console.log("signup요청 실패");
    }
  };

  const closeSignup = () => {
    setOpenSignup(false);
    inputEmail.current.value = "";
    inputName.current.value = "";
    inputNickname.current.value = "";
    inputPw.current.value = "";
    inputPwCheck.current.value = "";
    setIdInput("");
    setPwInput("");
    setPwCheckInput("");
    setNameInput("");
    setNicknameInput("");
    setEmailError("");
    setPwError("");
  };

  const [idInput, setIdInput] = useState<string>("");
  const [pwInput, setPwInput] = useState<string>("");
  const [pwCheckInput, setPwCheckInput] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [nicknameInput, setNicknameInput] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [pwError, setPwError] = useState<string>("");

  const inputEmail = useRef<any>();
  const inputName = useRef<any>();
  const inputNickname = useRef<any>();
  const inputPw = useRef<any>();
  const inputPwCheck = useRef<any>();

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
      <div className="login-signup-modal-outsider" onClick={closeSignup} />
      <div className="login-signup-modal">
        <span className="login-close" onClick={closeSignup}>
          X
        </span>
        <div className="login-title">SIGN UP</div>
        <div className="content-flex">
          <div className="login-content">
            <div>
              <div>Email</div>
              <input
                onChange={handleIdInput}
                type="text"
                name="email"
                ref={inputEmail}
              ></input>
            </div>
            <div>
              <div>Name</div>
              <input
                onChange={handleNameInput}
                type="text"
                name="name"
                ref={inputName}
              ></input>
            </div>
            <div>
              <div>Nickname</div>
              <input
                onChange={handleNicknameInput}
                type="text"
                name="nickname"
                ref={inputNickname}
              ></input>
            </div>
            <div>
              <div>Password</div>
              <input
                onChange={handlePwInput}
                type="password"
                name="password"
                ref={inputPw}
              ></input>
            </div>
            <div>
              <div>Pw Check</div>
              <input
                onChange={handlePwCheckInput}
                type="password"
                name="check_password"
                ref={inputPwCheck}
              ></input>
            </div>
          </div>
        </div>
        <div className="error-message">
          {emailError.length === 0 ? <>{pwError}</> : <>{emailError}</>}
        </div>
        <div>
          <button className="loginBtn-2" onClick={responseSignup}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
