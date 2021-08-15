import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import EachUser from "./EachUser";
import { SearchUserProps } from "../../props-types";
import { followerData } from "../../state-types";

function SearchUser({
  openSearchUser,
  setOpenSearchUser,
  followList,
  updateFollow,
  setLoginController,
}: SearchUserProps) {
  const state = useSelector((state: RootState) => state.userReducer);
  const myId = state.user.user_id;

  const inputSearchUser = useRef<HTMLInputElement>(null);
  const [searchUserInput, setSearchUserInput] = useState<string>("");
  const [searchedUsers, setsearchedUsers] = useState<followerData[]>([]);
  const [nonFollowList, setNonFollowList] = useState<followerData[]>([]);

  // 팔로우 하지 않은 유저만 필터링
  useEffect(() => {
    if (openSearchUser) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/users`)
        .then((res) => res.data)
        .then((allUser) => {
          return allUser
            .filter((eachUser: followerData) => eachUser._id !== myId)
            .filter(
              (meExcluded: followerData) =>
                !followList
                  .map((follow: followerData) => follow._id)
                  .includes(meExcluded._id)
            );
        })
        .then((res) => setNonFollowList(res))
        .catch((err) => console.log(err));
    }
  }, [openSearchUser, followList]);

  useEffect(() => {
    if (searchUserInput.length === 0) {
      return;
    }
    handleSearchUser();
  }, [searchUserInput, nonFollowList]);

  const handleSearchUser = () => {
    const filteredUser = nonFollowList.filter((nonFollow: followerData) => {
      if (nonFollow.name) {
        return nonFollow.name.toLowerCase().includes(searchUserInput);
      }
    });
    setsearchedUsers(filteredUser);
  };

  const handleSearchUserInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchUserInput(e.target?.value.toLowerCase());
    },
    [searchUserInput]
  );

  return (
    <div className={`search-user-modal background ${openSearchUser && "show"}`}>
      <span
        className="search-user-close"
        onClick={() => {
          setOpenSearchUser(false);
          if (inputSearchUser.current?.value) {
            inputSearchUser.current.value = "";
            setSearchUserInput("");
          }
        }}
      >
        X
      </span>
      <div>
        <div className="followlist-title">유저 찾기</div>
        <input
          type="text"
          onChange={handleSearchUserInput}
          placeholder="이름을 검색해주세요"
          ref={inputSearchUser}
        />
      </div>
      <div className="follow">
        {searchUserInput.length === 0 ? (
          <div className="search-not-found">새로운 유저를 찾아보세요</div>
        ) : searchedUsers.length > 0 ? (
          searchedUsers.map((each) => (
            <EachUser
              searchedUsers={each}
              updateFollow={updateFollow}
              key={each.email}
              setLoginController={setLoginController}
            />
          ))
        ) : (
          <div className="search-not-found">검색 결과가 없습니다</div>
        )}
      </div>
    </div>
  );
}

export default SearchUser;
