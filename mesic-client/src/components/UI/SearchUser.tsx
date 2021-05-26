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
          return allUser.filter((user: any) => {
            for (let follow of followList) {
              return follow._id !== user._id;
            }
          });
        })
        .then((res: any) => setNonFollowList(res));
    }
  }, [openSearchUser]);

  const handleSearchUser = () => {
    console.log("works");
    const filteredUser = nonFollowList.filter((nonFollow: any) => {
      if (nonFollow.email) {
        return nonFollow.email.toLowerCase().includes(searchUserInput);
      }
    });
    setsearchedUsers(filteredUser);
  };

  const handleSearchUserInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchUserInput(e.target?.value);
    },
    [searchUserInput]
  );

  return (
    <div className={`background ${openSearchUser ? "show" : ""}`}>
      <div>
        <input
          type="text"
          onChange={handleSearchUserInput}
          placeholder="이메일을 검색해주세요"
          ref={inputSearchUser}
        ></input>
        <button onClick={handleSearchUser}>검색</button>
      </div>
      {searchedUsers.length === 0 ? (
        <div>새로운 유저를 찾아보세요</div>
      ) : (
        searchedUsers.map((each) => <EachUser searchedUsers={each} />)
      )}
    </div>
  );
}

export default SearchUser;
