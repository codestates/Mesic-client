import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import EachUser from "./EachUser";

function SearchUser({ openSearchUser, setOpenSearchUser }: any) {
  const inputSearchUser = useRef<any>();
  const [searchUserInput, setSearchUserInput] = useState<string>("");
  const [alluser, setAlluser] = useState<any>([]);
  const [searchedUser, setSearchedUser] = useState<any>([]);

  useEffect(() => {
    if (openSearchUser) {
      axios
        .get(
          "http://ec2-52-79-241-131.ap-northeast-2.compute.amazonaws.com/users"
        )
        .then((res) => {
          setAlluser(res.data);
          console.log("alluser ===", alluser);
        });
    }
  }, [openSearchUser]);

  const handleSearchUser = () => {
    const filteredUser = alluser.filter((user: any) => {
      return user.nickname === searchUserInput;
    });
    console.log("filteredUser === ", filteredUser);
    setSearchedUser(filteredUser);
  };

  const handleSearchUserInput = (e: any) => {
    setSearchUserInput(e.target.value);
  };
  return (
    <div className={`background ${openSearchUser ? "show" : ""}`}>
      <div>
        <input
          type="text"
          onChange={handleSearchUserInput}
          placeholder="닉네임을 검색해보세요"
          ref={inputSearchUser}
        ></input>
        <button onClick={handleSearchUser}>검색</button>
      </div>
      {searchedUser.length === 0 ? (
        <div>새로운 유저를 찾아보세요</div>
      ) : (
        <EachUser searchedEachUser={searchedUser[0]} alluser={alluser} />
      )}
    </div>
  );
}

export default SearchUser;
