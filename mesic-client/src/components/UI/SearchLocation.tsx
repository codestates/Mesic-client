import React, { useState } from "react";

function SearchLocation({ handleChangeKeywordInput, searchKeyword }: any) {
  return (
    <div className="search-location">
      <input
        type="text"
        placeholder="장소를 검색하세요"
        onChange={handleChangeKeywordInput}
        onKeyUp={searchKeyword}
      ></input>
      <button onClick={searchKeyword}>검색</button>
    </div>
  );
}

export default SearchLocation;
