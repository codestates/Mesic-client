import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
const KEY = "AIzaSyC77gm8pbkNvv_BYkvD45foo9m19j9jOKs";

function EditMusic({
  openEditMusic,
  setOpenEditMusic,
  setUpdateMode,
  setUpdateMusic,
  setPostMusic,
}: any) {
  // 서버로 PATCH 요청을 보내주는 함수 필요
  // AIzaSyC77gm8pbkNvv_BYkvD45foo9m19j9jOKs
  const { mode } = useSelector((state: RootState) => state.userReducer).user;
  const [searchMusicInput, setSearchMusicInput] = useState<string>("");
  const [searchedMusic, setSearchedMusic] = useState<any[]>([]);

  const handleSearchMusicInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchMusicInput(e.target?.value);
    },
    [searchMusicInput]
  );

  const youtube = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3/",
    params: {
      part: "snippet",
      maxResults: 3,
      key: KEY,
    },
  });

  const handleSubmit = async () => {
    const res = await youtube.get("/search", {
      params: {
        q: `${searchMusicInput} audio`,
      },
    });
    console.log("검색 결과 : ", res);
    setSearchedMusic(res.data.items);
  };

  const searchMusicEvent = (e: any) => {
    if (searchMusicInput.length === 0) {
      // 업데이트 모드??
      return;
    } else if (e.keyCode === 13 || e.type === "click") {
      handleSubmit();
    }
  };

  const selectUpdateMusic = (each: any) => {
    setOpenEditMusic(false);
    setUpdateMode(true);
    setUpdateMusic(each);
  };
  const selectPostMusic = (each: any) => {
    setOpenEditMusic(false);
    setPostMusic(each);
  };

  return (
    <div className={`border background ${openEditMusic ? "show" : ""}`}>
      <input
        placeholder="노래 제목을 검색해주세요"
        onChange={handleSearchMusicInput}
        onKeyUp={searchMusicEvent}
      />
      <button onClick={searchMusicEvent}>검색</button>
      <div>
        <ul>
          {searchedMusic.map((each) => (
            <li
              style={{ listStyleType: "none" }}
              onClick={mode === "POST" ? selectPostMusic : selectUpdateMusic}
            >
              <img
                style={{ width: "100px" }}
                src={each.snippet.thumbnails.medium.url}
              />
              <span>{each.snippet.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => setOpenEditMusic(false)}>닫기</button>
    </div>
  );
}

export default EditMusic;
