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
        <div className="search-location-flex">
          <input
            type="text"
            placeholder="장소를 검색해주세요"
            onChange={handleChangeKeywordInput}
            onKeyUp={keywordSearchEvent}
          ></input>
          <i onClick={keywordSearchEvent} className="fas fa-search"></i>
        </div>
        <div className="search-location-result">
          {searchMode ? (
            <ul style={{ backgroundColor: "white" }}>
              {keywordSearchData.map((data: any) => (
                <li onClick={() => keywordSearchSelect(data.y, data.x)}>
                  <div>{data.place_name}</div>
                  <div>{data.address_name}</div>
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchLocation;
