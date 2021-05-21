import React, { useState } from "react";

function SearchLocation({
  handleChangeKeywordInput,
  searchKeyword,
  keywordSearchData,
}: any) {
  console.log(keywordSearchData);
  return (
    <>
      <div className="search-location">
        <input
          type="text"
          placeholder="장소를 검색하세요"
          onChange={handleChangeKeywordInput}
          onKeyUp={searchKeyword}
        ></input>
        <button onClick={searchKeyword}>검색</button>
        <ul style={{ backgroundColor: "white" }}>
          {keywordSearchData.map((data: any) => (
            <li style={{ listStyleType: "none" }}>
              <div>{data.place_name}</div>
              <div style={{ fontSize: "x-small" }}>{data.address_name}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SearchLocation;
