import axios from "axios";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
const KEY = "AIzaSyA5le4ZDagT75Ntm8_OjFvIyy-NGOPtBUM";

function EditMusic({
  openEditMusic,
  updateMode,
  setOpenEditMusic,
  setUpdateMode,
  setUpdateMusic,
  setPostMusic,
}: any) {
  // 서버로 PATCH 요청을 보내주는 함수 필요
  // AIzaSyC77gm8pbkNvv_BYkvD45foo9m19j9jOKs
  const { mode } = useSelector((state: RootState) => state.modeReducer).user;
  const [searchMusicInput, setSearchMusicInput] = useState<string>("");
  const [searchedMusic, setSearchedMusic] = useState<any[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<{
    video_Id: string;
    title: string;
    thumbnail: string;
  }>({ video_Id: "", title: "", thumbnail: "" });
  const searchInput = useRef<any>();

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

  const handleSearch = async () => {
    const res = await youtube.get("/search", {
      params: {
        q: `${searchMusicInput} audio`,
      },
    });
    setSearchedMusic(res.data.items);
  };

  useEffect(() => {
    if (openEditMusic) {
      if (mode === "POST") {
        selectPostMusic(selectedMusic);
      } else {
        selectUpdateMusic(selectedMusic);
      }
    }
  }, [selectedMusic]);

  const handleSelect = (video_Id: string, title: string, thumbnail: string) => {
    setSelectedMusic({
      video_Id,
      title,
      thumbnail,
    });
    setSearchedMusic([]);
    searchInput.current.value = "";
  };

  const searchMusicEvent = (e: any) => {
    if (searchMusicInput.length === 0) {
      // 업데이트 모드??
      return;
    } else if (e.keyCode === 13 || e.type === "click") {
      handleSearch();
    }
  };

  const selectUpdateMusic = (refinedData: any) => {
    setUpdateMusic(refinedData);
    setUpdateMode(true);
    setOpenEditMusic(false);
  };

  const selectPostMusic = (refinedData: any) => {
    setPostMusic(refinedData);
    setUpdateMode(true); // PostMusic 위젯을 활성화
    setOpenEditMusic(false);
  };

  return (
    <div
      className={`edit-music-modal background ${openEditMusic ? "show" : ""}`}
    >
      <div className="edit-music">
        <input
          className="search-music"
          placeholder="노래 제목을 검색해주세요"
          onChange={handleSearchMusicInput}
          onKeyUp={searchMusicEvent}
          ref={searchInput}
        />
        <button onClick={searchMusicEvent}>검색</button>
        <div>
          <ul>
            {searchedMusic.map((each) => (
              <li
                style={{ listStyleType: "none" }}
                onClick={() =>
                  handleSelect(
                    each.id.videoId,
                    each.snippet.title,
                    each.snippet.thumbnails.medium.url
                  )
                }
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
        <button
          onClick={() => {
            setSearchedMusic([]);
            searchInput.current.value = "";
            setOpenEditMusic(false);
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default EditMusic;
