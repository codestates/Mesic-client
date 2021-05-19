import React, { useState } from "react";

function SearchLocation() {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearchInput = (e: any) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="search-location">
      <input
        type="text"
        placeholder="장소를 검색하세요"
        value={searchInput}
        onChange={handleSearchInput}
      ></input>
      <button>검색</button>
    </div>
  );
}

export default SearchLocation;
