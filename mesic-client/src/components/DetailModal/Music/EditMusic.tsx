import axios from "axios";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { musicData } from "../../../state-types";
import { EditMusicProps } from "../../../props-types";

function EditMusic({
  openEditMusic,
  setOpenEditMusic,
  setUpdateMode,
  setPostUpdateMusic,
  setIsPlay,
}: EditMusicProps) {
  const { mode } = useSelector((state: RootState) => state.modeReducer).user;
  const [searchMusicInput, setSearchMusicInput] = useState<string>("");
  const [searchedMusic, setSearchedMusic] = useState<any[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<musicData>({
    video_Id: "",
    title: "",
    thumbnail: "",
  });
  const searchInput = useRef<HTMLInputElement>(null);

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
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
    },
  });

  const handleSearch = async () => {
    const res = await youtube.get("/search", {
      params: {
        q: `${searchMusicInput} audio`,
        type: "video",
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
    if (searchInput.current?.value) {
      searchInput.current.value = "";
    }
  };

  const searchMusicEvent = (e: any) => {
    if (searchMusicInput.length === 0) {
      return;
    } else if (e.keyCode === 13 || e.type === "click") {
      handleSearch();
    }
  };

  const selectUpdateMusic = (refinedData: musicData) => {
    setPostUpdateMusic(refinedData);
    setUpdateMode(true);
    setOpenEditMusic(false);
  };

  const selectPostMusic = (refinedData: musicData) => {
    setPostUpdateMusic(refinedData);
    setUpdateMode(true);
    setOpenEditMusic(false);
  };

  return (
    <div
      className={`edit-music-modal background ${openEditMusic && "show"}`}
    >
      <div className="edit-music-title">노래 검색</div>
      <div className="edit-music">
        <input
          type="text"
          className="search-music"
          placeholder="노래 제목을 검색해주세요"
          onChange={handleSearchMusicInput}
          onKeyUp={searchMusicEvent}
          ref={searchInput}
        />
        <i onClick={searchMusicEvent} className="fas fa-search"></i>
      </div>
      <div>
        <ul className="edit-music-list">
          {searchedMusic.map((each) => (
            <li
              className="edit-music-searched"
              style={{ listStyleType: "none" }}
              onClick={() => {
                handleSelect(
                  each.id.videoId,
                  each.snippet.title,
                  each.snippet.thumbnails.medium.url
                );
                setIsPlay(true);
              }}
            >
              <img
                style={{ width: "100px" }}
                src={each.snippet.thumbnails.medium.url}
              />
              <div className="edit-music-hidden">
                <div className="edit-music-searched-title">
                  {each.snippet.title}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <span
        className="edit-music-close-btn"
        onClick={() => {
          setSearchedMusic([]);
          if (searchInput.current?.value) {
            searchInput.current.value = "";
          }
          setOpenEditMusic(false);
        }}
      >
        X
      </span>
    </div>
  );
}

export default EditMusic;
