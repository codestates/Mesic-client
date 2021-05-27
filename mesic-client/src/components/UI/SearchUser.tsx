import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import EachUser from "./EachUser";

function SearchUser({ openSearchUser, followList, setOpenSearchUser }: any) {
  const inputSearchUser = useRef<any>();
  const [searchUserInput, setSearchUserInput] = useState<string>("");
  const [searchedUsers, setsearchedUsers] = useState<string[]>([]);
  const [nonFollowList, setNonFollowList] = useState<any[]>([]);

  // 팔로우 하지 않은 유저만 필터링
  useEffect(() => {
    if (openSearchUser) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/users`)
        .then((res) => res.data)
        .then((allUser) => {
          return allUser.filter(
            (user: any) =>
              !followList.map((follow: any) => follow._id).includes(user._id)
          );
        })
        .then((res: any) => setNonFollowList(res));
    }
  }, [openSearchUser]);

  useEffect(() => {
    if (searchUserInput.length === 0) {
      return;
    }
    handleSearchUser();
  }, [searchUserInput]);

  const handleSearchUser = () => {
    console.log("works");
    const filteredUser = nonFollowList.filter((nonFollow: any) => {
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
    <div className={`background ${openSearchUser ? "show" : ""}`}>
      <div>
        <input
          type="text"
          onChange={handleSearchUserInput}
          placeholder="이름을 검색해주세요"
          ref={inputSearchUser}
        ></input>
        <button onClick={handleSearchUser}>검색</button>
      </div>
      {searchUserInput.length === 0 ? (
        <div>새로운 유저를 찾아보세요</div>
      ) : searchedUsers.length > 0 ? (
        searchedUsers.map((each) => <EachUser searchedUsers={each} />)
      ) : (
        <div>검색 결과가 없습니다</div>
      )}
    </div>
  );
}

export default SearchUser;
