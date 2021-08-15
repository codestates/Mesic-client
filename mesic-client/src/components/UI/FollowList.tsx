import axios from "axios";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { refreshFollow } from "../../actions/index";
import EachFollow from "./EachFollow";
import SearchUser from "./SearchUser";
import { FollowListProps } from "../../props-types";
import { followerData } from "../../state-types";

function FollowList({ setLoginController }: FollowListProps) {
  const state = useSelector((state: RootState) => state);
  const { follow, user_id } = state.userReducer.user;
  const { checkedFollow }: any = state.modeReducer;
  const dispatch = useDispatch();

  const inputFollow = useRef<HTMLInputElement>(null);
  const [followInput, setFollowInput] = useState<string>("");
  const [followList, setFollowList] = useState<followerData[]>([]);
  const [searchedFollow, setSearchedFollow] = useState<followerData[]>([]);
  const [openSearchUser, setOpenSearchUser] = useState<boolean>(false);

  // 유저 팔로워의 정보를 가져오기
  useEffect(() => {
    if (follow.length > 0) {
      const tempArr: followerData[] = [];
      for (let eachId of follow) {
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/users/${eachId}`)
          .then((res) => {
            res.data.marker = "";
            tempArr.push(res.data);
          });
      }
      setTimeout(() => {
        setFollowList(tempArr);
      }, 200);
    }
  }, [follow]);

  // 입력 시 자동완성
  useEffect(() => {
    handleSearchFollow();
  }, [followInput, followList]);

  // 입력 값으로 유저 찾기
  const handleSearchFollow = () => {
    setSearchedFollow(
      followList.filter((follow: followerData) =>
        follow.name.toLowerCase().includes(followInput)
      )
    );
  };

  // 키보드 입력 핸들러
  const handleFollowInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFollowInput(e.target?.value.toLowerCase());
    },
    [followInput]
  );

  // 서버에서 업데이트 된 팔로우 불러오기
  const updateFollow = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/users/${user_id}`)
      .then((res) => {
        dispatch(refreshFollow(res.data.follow));
      })
      .catch((err) => console.log(err));
  };

  // 팔로우 체크 시 팔로우 마커 색상 저장
  useEffect(() => {
    if (checkedFollow.length === 0) {
      return;
    }
    for (let i = 0; i < followList.length; i += 1) {
      for (let j = 0; j < checkedFollow.length; j += 1) {
        if (followList[i]._id === checkedFollow[j].user_id) {
          followList[i].marker = checkedFollow[j].marker[1];
          setFollowList([...followList]);
        }
      }
    }
  }, [checkedFollow]);

  return (
    <div className="followlist">
      <div className="followlist-title">팔로우 목록</div>
      <div>
        <input
          type="text"
          onChange={handleFollowInput}
          ref={inputFollow}
          placeholder="이름을 검색해주세요"
        ></input>
      </div>
      <div className="follow">
        {followInput.length === 0 &&
          (follow.length > 0 ? (
            followList.map((follow: any) => {
              return (
                <EachFollow
                  eachFollow={follow}
                  updateFollow={updateFollow}
                  key={follow.email}
                />
              );
            })
          ) : (
            <div className="search-not-found">
              다른 유저를 찾아 팔로우하세요
            </div>
          ))}
        {followInput.length === 0 ||
          (searchedFollow.length > 0 ? (
            searchedFollow.map((searched: any) => (
              <EachFollow
                eachFollow={searched}
                updateFollow={updateFollow}
                key={searched.email}
              />
            ))
          ) : (
            <div className="search-not-found">검색 결과가 없습니다</div>
          ))}
      </div>
      <div className="search-user-box">
        <button
          className="find-user-btn"
          onClick={() => setOpenSearchUser(true)}
        >
          새로운 유저 찾아보기
        </button>
      </div>
      <SearchUser
        openSearchUser={openSearchUser}
        setOpenSearchUser={setOpenSearchUser}
        followList={followList}
        updateFollow={updateFollow}
        setLoginController={setLoginController}
      />
    </div>
  );
}

export default FollowList;
