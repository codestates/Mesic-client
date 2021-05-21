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

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleHideModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    let mapContainer = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    let options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    let map = new window.kakao.maps.Map(mapContainer, options); //지도 생성 및 객체 리턴

    //지도에 클릭이벤트 등록해서 좌표 클릭된 곳 좌표 가져오기
    window.kakao.maps.event.addListener(
      map,
      "click",
      function (mouseEvent: any) {
        var markerPosition = mouseEvent.latLng;
        console.log(markerPosition);
        // 마커를 생성
        let marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        /*isLogin이 true이면 마커를 지도위에 표시 후 mode를 post로 변경
        false이면 마커를 지도 위에 표시 후 로그인하라는 알림 띄우고, 알림꺼지면 마커도 지우기
        마커를 지도 위에 표시*/
        marker.setMap(map);
        if (!isLogin) {
          console.log("로그인 후 나만의 로그를 만들어보세요!");
          setTimeout(() => marker.setMap(null), 2000);
        } else {
          dispatch(switchMode("POST"));
          handleOpenModal();
        }
      }
    );
  }, []);

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
      <div id="map" />
      <DetailModal open={openModal} />
      MainPage
      <button onClick={handleOpenModal}>PIN</button>
      <button onClick={handleHideModal}>HIDE</button>
    </div>
  );
}

export default MainPage;
