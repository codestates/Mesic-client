import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { setSourceMapRange } from "typescript";
import DetailModal from "../components/DetailModal/DetailModal";
import Map from "../components/UI/Map";
import SearchLocation from "../components/UI/SearchLocation";
import { useDispatch, useSelector } from "react-redux";
import { switchMode } from ".././actions/index";
import { RootState } from ".././reducers";

declare global {
  interface Window {
    kakao: any;
  }
}

function MainPage() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.userReducer);
  const { isLogin } = state.user;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [keywordInput, setKeywordInput] = useState<string>("");
  const [keywordSearchData, setKeywordSearchData] = useState<any>([]);

  const [map, setMap] = useState<any>({});
  const [LatLng, setLatLng] = useState<number[]>([
    37.5139795454969, 127.048963363388,
  ]);
  const [mapLevel, setMapLevel] = useState<number>(5);
  const [searchLatLng, setSearchLatlng] = useState<number[]>([
    37.5139795454969, 127.048963363388,
  ]);
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [searchMarkers, setSearchMarkers] = useState<any[]>([]);

  const [postLatLng, setPostLatLng] = useState<number[]>([
    37.5139795454969, 127.048963363388,
  ]);
  const [postMarkers, setPostMarkers] = useState<any[]>([]);

  useEffect(() => {
    window.kakao.maps.load(() => {
      loadKakaoMap();
    });
  }, []);

  useEffect(() => {
    searchKeyword();
  }, [keywordInput]);

  useEffect(() => {
    if (Object.keys(map).length > 0) {
      searchMarkerControl();
    }
  }, [searchLatLng]);

  useEffect(() => {
    if (Object.keys(map).length > 0) {
      postMarkerControl();
    }
  }, [postLatLng]);

  // 키워드 검색 마커
  const searchMarkerControl = () => {
    if (searchMarkers.length > 0) {
      deleteSearchMarkers();
    }

    const markers = [];
    const position = new window.kakao.maps.LatLng(
      searchLatLng[0],
      searchLatLng[1]
    );

    const image = new window.kakao.maps.MarkerImage(
      `/images/marker/search-marker.gif`,
      new window.kakao.maps.Size(40, 70),
      { offset: new window.kakao.maps.Point(22, 70) }
    );

    const marker = new window.kakao.maps.Marker({
      image,
      position,
    });
    marker.setMap(map);
    markers.push(marker);
    setSearchMarkers(markers);
  };

  const deleteSearchMarkers = () => {
    for (let i = 0; i < searchMarkers.length; i++) {
      searchMarkers[i].setMap(null);
    }
  };

  // (POST MODE) 지도 클릭 마커
  const postMarkerControl = () => {
    if (postMarkers.length > 0) {
      deletePostMarkers();
    }
    deleteSearchMarkers();
    const markers = [];
    const position = new window.kakao.maps.LatLng(postLatLng[0], postLatLng[1]);

    const marker = new window.kakao.maps.Marker({
      position,
    });
    marker.setMap(map);
    markers.push(marker);
    setPostMarkers(markers);
  };

  const deletePostMarkers = () => {
    for (let i = 0; i < postMarkers.length; i++) {
      postMarkers[i].setMap(null);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleHideModal = () => {
    setOpenModal(false);
  };

  const loadKakaoMap = () => {
    const container = document.getElementById("kakao-map");
    const options = {
      center: new window.kakao.maps.LatLng(LatLng[0], LatLng[1]),
      level: mapLevel,
    };

    const map = new window.kakao.maps.Map(container, options);
    setMap(map);

    window.kakao.maps.event.addListener(map, "click", (mouseEvent: any) => {
      const clickPosition = mouseEvent.latLng;
      setPostLatLng([clickPosition.Ma, clickPosition.La]);
      if (!isLogin) {
        alert("로그인 후 나만의 로그를 만들어보세요!");
      } else {
        dispatch(switchMode("POST"));
        handleOpenModal();
      }
    });
  };

  const moveKakaoMap = (lat: number, lng: number) => {
    const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
    map.panTo(moveLatLon);
    setLatLng([lat, lng]);
  };

  const handleChangeKeywordInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeywordInput(e.target?.value);
    },
    [keywordInput]
  );

  const searchKeyword = () => {
    if (keywordInput === "") {
      setKeywordSearchData([]);
      setSearchMode(false);
      return;
    }
    setSearchMode(true);
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keywordInput}`,
        {
          headers: {
            authorization: "KakaoAK 61dc9e8de327371dcac3d79909281b7d",
          },
        }
      )
      .then((res) => {
        if (res.data.documents.length === 0) {
          return;
        }
        const slicedData = res.data.documents.slice(0, 4);
        setKeywordSearchData(slicedData);
      });
  };

  const keywordSearchEvent = (e: any) => {
    if (keywordInput.length === 0 || keywordSearchData.length === 0) {
      return;
    } else if (e.keyCode === 13 || e.type === "click") {
      const y = keywordSearchData[0].y;
      const x = keywordSearchData[0].x;
      moveKakaoMap(y, x);
      setSearchMode(false);
      setSearchLatlng([y, x]);
    }
  };

  const keywordSearchSelect = (y: number, x: number) => {
    moveKakaoMap(y, x);
    setSearchMode(false);
    setSearchLatlng([y, x]);
  };

  // const setMarker = (y: number, x: number) => {
  //   let marker = new window.kakao.maps.Marker({
  //     position: new window.kakao.maps.LatLng(y, x),
  //   });
  //   marker.setMap(map);
  // };

  return (
    <div className="App">
      <SearchLocation
        handleChangeKeywordInput={handleChangeKeywordInput}
        keywordSearchEvent={keywordSearchEvent}
        keywordSearchData={keywordSearchData}
        searchMode={searchMode}
        keywordSearchSelect={keywordSearchSelect}
      />
      <DetailModal open={openModal} />
      MainPage
      <button onClick={handleOpenModal}>PIN</button>
      <button onClick={handleHideModal}>HIDE</button>
      <div id="kakao-map" />
    </div>
  );
}

export default MainPage;
