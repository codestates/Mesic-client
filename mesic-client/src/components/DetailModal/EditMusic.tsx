import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
const KEY = "AIzaSyC77gm8pbkNvv_BYkvD45foo9m19j9jOKs";

function EditMusic({
  openEditMusic,
  setOpenEditMusic,
  handleSelectMusic,
}: any) {
  // 서버로 PATCH 요청을 보내주는 함수 필요
  // AIzaSyC77gm8pbkNvv_BYkvD45foo9m19j9jOKs
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
            <li style={{ listStyleType: "none" }} onClick={handleSelectMusic}>
              <img
                style={{ width: "100px" }}
                src={each.snippet.thumbnails.medium.url}
              />
              <span>{each.snippet.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => setOpenEditMusic(false)}>Cancel</button>
    </div>
  );
}

export default EditMusic;
