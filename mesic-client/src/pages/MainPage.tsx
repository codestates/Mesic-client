import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { setSourceMapRange } from "typescript";
import DetailModal from "../components/DetailModal/DetailModal";
import Map from "../components/UI/Map";
import SearchLocation from "../components/UI/SearchLocation";

function MainPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [keywordInput, setKeywordInput] = useState<string>("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleHideModal = () => {
    setOpenModal(false);
  };

  const handleChangeKeywordInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeywordInput(e.target?.value);
    },
    [keywordInput]
  );

  const searchKeyword = (e: any) => {
    if (e.keyCode === 13 || e.type === "click") {
      axios
        .get(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keywordInput}`,
          {
            headers: {
              authorization: "KakaoAK 61dc9e8de327371dcac3d79909281b7d",
            },
          }
        )
        .then((res) => console.log(res.data.documents[0]));
    }
    return;
  };

  return (
    <div className="App">
      <SearchLocation
        handleChangeKeywordInput={handleChangeKeywordInput}
        searchKeyword={searchKeyword}
      />
      <Map handleOpenModal={handleOpenModal} />
      <DetailModal open={openModal} />
      MainPage
      <button onClick={handleOpenModal}>PIN</button>
      <button onClick={handleHideModal}>HIDE</button>
    </div>
  );
}

export default MainPage;
