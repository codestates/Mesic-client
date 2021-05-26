import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import EachFollow from "./EachFollow";
import SearchUser from "./SearchUser";

function FollowList() {
  const state = useSelector((state: RootState) => state.userReducer);
  const { follow, user_id, token, isLogin } = state.user;

  const inputFollow = useRef<any>();
  const [followInput, setFollowInput] = useState<string>("");
  const [followList, setFollowList] = useState<any>([]);
  const [followIdList, setFollowIdList] = useState<any>([]);
  const [openSearchUser, setOpenSearchUser] = useState<boolean>(false);
  const tempFollowList: any = [];

  useEffect(() => {}, [follow]);

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
          <div>다른 유저를 찾아 팔로우하세요</div>
          {followList.map((each: any) => {
            <EachFollow eachfollow={each} key={each.nickname} />;
          })}
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
