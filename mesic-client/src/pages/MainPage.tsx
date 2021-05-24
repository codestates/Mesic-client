import axios from "axios";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { setSourceMapRange } from "typescript";
import DetailModal from "../components/DetailModal/DetailModal";
import Map from "../components/UI/Map";
import SearchLocation from "../components/UI/SearchLocation";
import { useDispatch, useSelector } from "react-redux";
import { switchMode } from ".././actions/index";
import { RootState } from ".././reducers";
import PostModal from "../components/DetailModal/PostModal";
import ReadModal from "../components/DetailModal/ReadModal";

declare global {
  interface Window {
    kakao: any;
  }
}

function MainPage() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.modeReducer);
  const { isLogin } = state.user;

  // const [openModal, setOpenModal] = useState<boolean>(false);

  // DetailModal 열림
  const [openReadModal, setOpenReadModal] = useState<boolean>(false);
  const [openPostModal, setOpenPostModal] = useState<boolean>(false);

  // 키워드 검색
  const [keywordInput, setKeywordInput] = useState<string>("");
  const [keywordSearchData, setKeywordSearchData] = useState<any>([]);
  const [searchMode, setSearchMode] = useState<boolean>(false);

  // 지도 생성
  const [map, setMap] = useState<any>({});
  const [LatLng, setLatLng] = useState<number[]>([
    37.5139795454969, 127.048963363388,
  ]);
  const [mapLevel, setMapLevel] = useState<number>(5);

  // 검색,포스트 위치
  const [searchLatLng, setSearchLatlng] = useState<number[]>([
    37.5139795454969, 127.048963363388,
  ]);
  const [postLatLng, setPostLatLng] = useState<number[]>([
    37.5139795454969, 127.048963363388,
  ]);

  // 검색,포스트 마커
  const [searchMarkers, setSearchMarkers] = useState<any[]>([]);
  const [postMarkers, setPostMarkers] = useState<any[]>([]);

  // 선택한 READ 마커의 데이터
  const [readMarkerData, setReadMarkerData] = useState<any>(null);

  // 모달 숨기기
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const detailModal = useRef<any>();

  // 지도 동적 렌더링
  useEffect(() => {
    window.kakao.maps.load(() => {
      loadKakaoMap();
    });
  }, []);

  // 검색어가 바뀌면, 검색 요청
  useEffect(() => {
    searchKeyword();
  }, [keywordInput]);

  // 검색 위치가 바뀌면, 해당 위치에 마커 생성
  useEffect(() => {
    if (Object.keys(map).length > 0) {
      searchMarkerControl();
    }
  }, [searchLatLng]);

  // POST 위치가 바뀌면, 해당 위치에 마커 생성
  useEffect(() => {
    if (Object.keys(map).length > 0) {
      postMarkerControl();
    }
  }, [postLatLng]);

  // READ 마커를 클릭하면, POST 마커 사라짐
  useEffect(() => {
    if (Object.keys(map).length > 0) {
      deletePostMarkers();
    }
  }, [readMarkerData]);

  // POST, READ 모달이 켜지거나 꺼지면, 검색 마커가 사라짐
  useEffect(() => {
    if (Object.keys(map).length > 0) {
      deleteSearchMarkers();
    }
  }, [openPostModal, openReadModal]);

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

  // (POST MODE) 지도 클릭 마커
  const postMarkerControl = () => {
    if (postMarkers.length > 0) {
      deletePostMarkers();
    }
    deleteSearchMarkers();
    const markers = [];
    const position = new window.kakao.maps.LatLng(postLatLng[0], postLatLng[1]);

    const image = new window.kakao.maps.MarkerImage(
      `/images/marker/post-marker.png`,
      new window.kakao.maps.Size(45, 45),
      { offset: new window.kakao.maps.Point(8, 50) }
    );

    const marker = new window.kakao.maps.Marker({
      image,
      position,
    });
    marker.setMap(map);
    markers.push(marker);
    setPostMarkers(markers);
  };

  // (READ MODE) 유저의 마커 생성
  const [myMarkers, setMyMarkers] = useState<any[]>([]);
  const viewMyMarkers = () => {
    deleteMyMarkers();
    const markers = [];
    for (let i = 0; i < state.pins.length; i += 1) {
      const position = new window.kakao.maps.LatLng(
        state.pins[i].y,
        state.pins[i].x
      );
      const marker = new window.kakao.maps.Marker({
        map,
        position,
      });
      marker.id = state.pins[i].id;
      window.kakao.maps.event.addListener(marker, "click", () => {
        // 마커 클릭 시
        handleMyMarkerClick(marker.id);
      });
      marker.setMap(map);
      markers.push(marker);
    }
    setMyMarkers(markers);
  };

  // 맵이 렌더링 되면, 유저의 READ 마커가 생성
  useEffect(() => {
    if (Object.keys(map).length > 0) {
      viewMyMarkers();
    }
  }, [map]);

  // 마커 제거 함수들
  const deleteMyMarkers = () => {
    for (let i = 0; i < myMarkers.length; i++) {
      myMarkers[i].setMap(null);
    }
  };

  const deletePostMarkers = () => {
    for (let i = 0; i < postMarkers.length; i++) {
      postMarkers[i].setMap(null);
    }
  };

  const deleteSearchMarkers = () => {
    for (let i = 0; i < searchMarkers.length; i++) {
      searchMarkers[i].setMap(null);
    }
  };

  // READ 마커 클릭 핸들러
  const handleMyMarkerClick = (id: number) => {
    setOpenReadModal(false);
    for (let i = 0; i < state.pins.length; i += 1) {
      if (state.pins[i].id === id) {
        setReadMarkerData(state.pins[i]);
        break;
      }
    }
    dispatch(switchMode("READ"));
    setOpenReadModal(true);
  };

  // 카카오맵 로드
  const loadKakaoMap = () => {
    const container = document.getElementById("kakao-map");
    const options = {
      center: new window.kakao.maps.LatLng(LatLng[0], LatLng[1]),
      level: mapLevel,
    };

    const map = new window.kakao.maps.Map(container, options);
    setMap(map);

    // 지도 클릭 핸들러
    window.kakao.maps.event.addListener(map, "click", (mouseEvent: any) => {
      setOpenReadModal(false);
      setReadMarkerData(null);
      const clickPosition = mouseEvent.latLng;
      setPostLatLng([clickPosition.Ma, clickPosition.La]);
      if (!isLogin) {
        alert("로그인 후 나만의 로그를 만들어보세요!");
      } else {
        dispatch(switchMode("POST"));
        setOpenPostModal(true);
      }
    });
  };

  // 맵 이동
  const moveKakaoMap = (lat: number, lng: number) => {
    const moveLatLon = new window.kakao.maps.LatLng(lat, lng);
    map.panTo(moveLatLon);
    setLatLng([lat, lng]);
  };

  // 키워드 검색 인풋
  const handleChangeKeywordInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeywordInput(e.target?.value);
    },
    [keywordInput]
  );

  // 키워드 검색 자동완성
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

  // 키워드 검색 버튼 + 엔터키 검색
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

  // 자동완성 목록 클릭 시 이동
  const keywordSearchSelect = (y: number, x: number) => {
    moveKakaoMap(y, x);
    setSearchMode(false);
    setSearchLatlng([y, x]);
  };

  // 모달 모두 끄기
  const closeDetailModal = () => {
    setOpenPostModal(false);
    setOpenReadModal(false);
  };

  const showHideDetailModal = () => {
    if (detailModal.current.style.display === "none") {
      detailModal.current.style.display = "block";
    } else {
      detailModal.current.style.display = "none";
    }
  };

  return (
    <div className="App">
      {openPostModal || openReadModal ? (
        <>
          <button onClick={closeDetailModal}>Close</button>
          {showDetailModal ? (
            <button
              onClick={() => {
                showHideDetailModal();
                setShowDetailModal(false);
              }}
            >
              Show
            </button>
          ) : (
            <button
              onClick={() => {
                showHideDetailModal();
                setShowDetailModal(true);
              }}
            >
              Hide
            </button>
          )}{" "}
        </>
      ) : (
        <> </>
      )}
      <SearchLocation
        handleChangeKeywordInput={handleChangeKeywordInput}
        keywordSearchEvent={keywordSearchEvent}
        keywordSearchData={keywordSearchData}
        searchMode={searchMode}
        keywordSearchSelect={keywordSearchSelect}
      />
      <div ref={detailModal}>
        {openReadModal ? (
          <ReadModal readMarkerData={readMarkerData} />
        ) : openPostModal ? (
          <PostModal />
        ) : (
          <></>
        )}
      </div>
      <div id="kakao-map" />
    </div>
  );
}

export default MainPage;
