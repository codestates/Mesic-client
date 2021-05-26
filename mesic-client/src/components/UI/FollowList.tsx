import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import EachFollow from "./EachFollow";
import SearchUser from "./SearchUser";

function FollowList() {
  const state = useSelector((state: RootState) => state.userReducer);
  const { follow, user_id, token } = state.user;

  const inputFollow = useRef<any>();
  const [followInput, setFollowInput] = useState<string>("");
  const [followList, setFollowList] = useState<any>([]);
  const [openSearchUser, setOpenSearchUser] = useState<boolean>(false);
  const tempFollowList: any = [];

  useEffect(() => {
    if (follow.length > 0) {
      follow.map((id: any) => {
        axios
          .get(
            `http://ec2-52-79-241-131.ap-northeast-2.compute.amazonaws.com/users/${id}`
          )
          .then((res) => {
            tempFollowList.push(res.data);
            console.log("tempFollowList === ", tempFollowList);
          });
      });
      setFollowList(tempFollowList);
    }
  }, [followList]);

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
          {followList.length === 0 ? (
            <div>다른 유저를 찾아보고 팔로우하세요</div>
          ) : (
            followList.map((follow: any, index: any) => {
              return <EachFollow eachFollow={follow} key={index} />;
            })
          )}
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
