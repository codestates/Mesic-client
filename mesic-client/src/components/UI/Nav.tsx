import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";

type NavProps = {
  //open: boolean;
};

function Nav(props: NavProps) {
  //const {open} = props;
  const state = useSelector((state: RootState) => state.userReducer);
  const { isLogin } = state.user;

  return (
    <div className="nav">
      <Link to="/">
        <button>Logo</button>
      </Link>
      {isLogin ? (
        <>
          <button>Login</button>
          <button>Signup</button>
        </>
      ) : (
        <>
          <button>Logout</button>
          <button>Mypage</button>
        </>
      )}
    </div>
  );
}

export default Nav;
