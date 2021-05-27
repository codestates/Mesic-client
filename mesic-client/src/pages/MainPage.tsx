import axios from "axios";
import React, { useState, useEffect, useCallback, useRef } from "react";
import SearchLocation from "../components/UI/SearchLocation";
import { useDispatch, useSelector } from "react-redux";
import { switchMode } from ".././actions/index";
import { RootState } from ".././reducers";
import PostModal from "../components/DetailModal/PostModal";
import ReadModal from "../components/DetailModal/ReadModal";
import FollowList from "../components/UI/FollowList";
import { Dummies } from "../components/Guest/Dummies";

declare global {
  interface Window {
    kakao: any;
  }
}

function MainPage() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const { isLogin, user_id, token } = state.userReducer.user;
  const { mode } = state.modeReducer.user;

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

  // 로그인 유저의 핀 데이터
  const [myPinData, setMypinData] = useState<any[]>([]);

  // 삭제 버튼 제거
  const [delPinBtn, setDelPinBtn] = useState<any>(null);

  // 지도 동적 렌더링
  useEffect(() => {
    window.kakao.maps.load(() => {
      loadKakaoMap();
    });
  }, [isLogin]);

  // 로그인 후 유저의 핀 가져오기
  useEffect(() => {
    if (isLogin) {
      getMyPins();
    }
    return;
  }, [map, mode, isLogin]);

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

  // READ 마커 생성 시 POST 마커 삭제
  useEffect(() => {
    if (mode !== "POST") {
      deletePostMarkers();
    }
    return;
  }, [mode]);

  // 맵이 렌더링 되면, 유저의 READ 마커가 생성
  useEffect(() => {
    if (Object.keys(map).length > 0) {
      if (!isLogin) {
        viewDummies();
      } else {
        viewMyMarkers();
      }
    }
  }, [myPinData, map]);

  // 로그인 유저 핀 가져오기
  const getMyPins = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/pins/users/${user_id}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setMypinData(data);
      })
      .catch((err) => console.log(err));
  };

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
    // CREATED 모드일 때 방금 만들어진 데이터를 띄움
    if (mode === "CREATED") {
      handleMyMarkerClick(myPinData[myPinData.length - 1]._id);
    }

    const markers = [];
    for (let i = 0; i < myPinData.length; i += 1) {
      const position = new window.kakao.maps.LatLng(
        parseFloat(myPinData[i].location.longitude),
        parseFloat(myPinData[i].location.latitude)
      );
      const marker = new window.kakao.maps.Marker({
        map,
        position,
      });
      marker.id = myPinData[i]._id;
      window.kakao.maps.event.addListener(marker, "click", () => {
        // 마커 클릭 시
        console.log(marker.id);
        handleMyMarkerClick(marker.id);
      });
      marker.setMap(map);
      markers.push(marker);

      // 만든 마커를 즉시 READ 모달에 띄움

      const content = document.createElement("span");
      content.textContent = "X";
      content.className = "deleteBtn";
      content.id = myPinData[i]._id;
      content.style.cssText = "color:red;"; // CSS 지우세요
      content.setAttribute("data-id", myPinData[i]._id);

      const delPosition = new window.kakao.maps.LatLng(
        parseFloat(myPinData[i].location.longitude),
        parseFloat(myPinData[i].location.latitude)
      );

      const customOverlay = new window.kakao.maps.CustomOverlay({
        map: map,
        position: delPosition,
        content: content,
        yAnchor: 2.7,
        xAnchor: 2.8,
        clickable: true,
      });

      // 핀 삭제
      content.addEventListener("click", (e: any) => {
        //! 삭제 버튼이 핀 삭제 시 바로 사라지지 않는 버그..
        //TODO : 확인 절차 필요
        customOverlay.setMap(null);

        axios
          .delete(
            `${process.env.REACT_APP_SERVER_URL}/pins/${e.target.dataset.id}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            dispatch(switchMode("NONE"));
          })
          .catch((err) => console.log(err));
      });
    }
    setMyMarkers(markers);
  };

  const viewDummies = () => {
    deleteMyMarkers();
    const markers = [];
    for (let i = 0; i < Dummies.length; i += 1) {
      const position = new window.kakao.maps.LatLng(
        Dummies[i].location.longitude,
        Dummies[i].location.latitude
      );
      const marker = new window.kakao.maps.Marker({
        map,
        position,
      });
      marker.id = Dummies[i]._id;
      window.kakao.maps.event.addListener(marker, "click", () => {
        // 마커 클릭 시
        handleMyMarkerClick(marker.id);
      });
      marker.setMap(map);
      markers.push(marker);
    }
    setMyMarkers(markers);
  };

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
  const handleMyMarkerClick = (id: string | number) => {
    if (openPostModal) {
      setOpenPostModal(false);
    }
    setOpenReadModal(false);
    if (!isLogin) {
      for (let i = 0; i < Dummies.length; i += 1) {
        if (Dummies[i]._id === id) {
          setReadMarkerData(Dummies[i]);
          break;
        }
      }
    }
    for (let i = 0; i < myPinData.length; i += 1) {
      if (myPinData[i]._id === id) {
        setReadMarkerData(myPinData[i]);
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
      console.log(clickPosition);
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
            authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MAP_RESTAPI_KEY}`,
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

  const showHideDetailModal = () => {
    if (detailModal.current.style.display === "none") {
      detailModal.current.style.display = "block";
    } else {
      detailModal.current.style.display = "none";
    }
  };

  useEffect(() => {
    setOpenReadModal(false);
    setOpenPostModal(false);
  }, [isLogin]);

  return (
    <div className="App">
      {openPostModal || openReadModal ? (
        <>
          <button
            onClick={() => {
              setOpenPostModal(false);
              setOpenReadModal(false);
            }}
          >
            Close
          </button>
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
      <FollowList />
      {openReadModal ? (
        <ReadModal readMarkerData={readMarkerData} />
      ) : openPostModal ? (
        <PostModal />
      ) : (
        <></>
      )}
      <div ref={detailModal}>
        {openReadModal ? (
          <ReadModal readMarkerData={readMarkerData} />
        ) : openPostModal ? (
          <PostModal postLatLng={postLatLng} />
        ) : (
          <></>
        )}
      </div>
      <div id="kakao-map" />
    </div>
  );
}

export default MainPage;
