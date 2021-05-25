import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import EachFollow from "./EachFollow";
import SearchUser from "./SearchUser";

//accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYWJiNWIxNDczZWZhMzMyNTBiM2U1ZSIsIm5hbWUiOiLtmJzsm5Ag7KeEIiwiaWF0IjoxNjIxOTQ4MjI5LCJleHAiOjE2MjE5NTU0Mjl9.buZef3czKTM9q7mjPLKowWcJNIrleuwAFIVU5AoNIbc"

function FollowList() {
  const state = useSelector((state: RootState) => state.modeReducer).user;

  const inputFollow = useRef<any>();
  const [followInput, setFollowInput] = useState<string>("");
  //const [followList, setFollowList] = useState<any>()
  const [openSearchUser, setOpenSearchUser] = useState<boolean>(false);

  const handleSearchFollow = () => {};

  const handleFollowInput = (e: any) => {
    setFollowInput(e.target.string);
  };

  return (
    <>
      <div className="followlist">
        <div className="followlist-title">팔로우 찾기</div>
        <div>
          <input
            type="text"
            onChange={handleFollowInput}
            ref={inputFollow}
          ></input>
          <button onClick={handleSearchFollow}>검색</button>
        </div>
        <div className="follow">
          <EachFollow />
        </div>
        <button onClick={() => setOpenSearchUser(true)}>
          새로운 유저 찾아보기
        </button>
        <SearchUser
          openSearchUser={openSearchUser}
          setOpenSearchUser={setOpenSearchUser}
        />
      </div>
    </>
  );
}

export default FollowList;
