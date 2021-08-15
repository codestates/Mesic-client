import { SearchLocationProps } from "../../state-types";

function SearchLocation({
  handleChangeKeywordInput,
  keywordSearchEvent,
  keywordSearchData,
  searchMode,
  keywordSearchSelect,
}: SearchLocationProps) {
  return (
    <>
      <div className="search-location">
        <div className="search-location-flex">
          <input
            type="text"
            placeholder="장소를 검색해주세요"
            onChange={handleChangeKeywordInput}
            onKeyUp={keywordSearchEvent}
          />
          <i onClick={keywordSearchEvent} className="fas fa-search" />
        </div>
        <div className="search-location-result">
          {searchMode && (
            <ul style={{ backgroundColor: "white" }}>
              {keywordSearchData.map((data: any) => (
                <li onClick={() => keywordSearchSelect(data.y, data.x)}>
                  <div>{data.place_name}</div>
                  <div>{data.address_name}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchLocation;
