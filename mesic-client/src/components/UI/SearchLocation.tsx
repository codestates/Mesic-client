import React, { useState } from "react";

function SearchLocation({
  handleChangeKeywordInput,
  keywordSearchEvent,
  keywordSearchData,
  searchMode,
  keywordSearchSelect,
}: any) {
  return (
    <>
      <div className="search-location">
        <input
          type="text"
          placeholder="장소를 검색하세요"
          onChange={handleChangeKeywordInput}
          onKeyUp={keywordSearchEvent}
        ></input>
        <button onClick={keywordSearchEvent}>검색</button>
        {searchMode ? (
          <ul style={{ backgroundColor: "white" }}>
            {keywordSearchData.map((data: any) => (
              <li
                onClick={() => keywordSearchSelect(data.y, data.x)}
                style={{ listStyleType: "none" }}
              >
                <div>{data.place_name}</div>
                <div style={{ fontSize: "x-small" }}>{data.address_name}</div>
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default SearchLocation;
