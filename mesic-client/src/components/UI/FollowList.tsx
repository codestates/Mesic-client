import axios from "axios";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import EachFollow from "./EachFollow";
import SearchUser from "./SearchUser";

function FollowList() {
  const state = useSelector((state: RootState) => state.userReducer);
  const { follow } = state.user;

  const inputFollow = useRef<any>();
  const [followInput, setFollowInput] = useState<string>("");
  const [followList, setFollowList] = useState<any[]>([]);
  const [openSearchUser, setOpenSearchUser] = useState<boolean>(false);
  const [searchedFollow, setSearchedFollow] = useState<string[]>([]);

  // 유저 팔로워의 정보를 가져오기
  useEffect(() => {
    if (follow.length > 0) {
      let tempArr: string[] = [];
      for (let eachId of follow) {
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/users/${eachId}`)
          .then((res) => {
            tempArr.push(res.data);
          });
      }
      setFollowList(tempArr);
    }
  }, [follow]);

  useEffect(() => {
    handleSearchFollow();
  }, [followInput]);

  const handleSearchFollow = () => {
    setSearchedFollow(
      followList.filter((follow) =>
        follow.name.toLowerCase().includes(followInput)
      )
    );
  };

  const handleFollowInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFollowInput(e.target?.value.toLowerCase());
    },
    [followInput]
  );

  return (
    <>
      <div className="followlist">
        <div className="followlist-title">팔로우 찾기</div>
        <div>
          <input
            type="text"
            onChange={handleFollowInput}
            ref={inputFollow}
            placeholder="이름을 검색해주세요"
          ></input>
        </div>
        <div className="follow">
          {followInput.length === 0 ? (
            followList.length > 0 ? (
              followList.map((follow: any, index: any) => {
                return <EachFollow eachFollow={follow} key={index} />;
              })
            ) : (
              <div>다른 유저를 찾아 팔로우하세요</div>
            )
          ) : searchedFollow.length > 0 ? (
            searchedFollow.map((searched: any, index: any) => (
              <EachFollow eachFollow={searched} index={index} />
            ))
          ) : (
            <div>검색 결과가 없습니다</div>
          )}
        </div>
        <button onClick={() => setOpenSearchUser(true)}>
          새로운 유저 찾아보기
        </button>
        <SearchUser
          openSearchUser={openSearchUser}
          setOpenSearchUser={setOpenSearchUser}
          followList={followList}
        />
      </div>
    </>
  );
}

export default FollowList;
