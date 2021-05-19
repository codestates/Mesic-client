import React from "react";
import {Link} from "react-router-dom";

function IntroPage() {
  return (
    <>
      <Link to="/mainpage">
        <button>시작하기</button>
      </Link>
      <div>
        매직 (Memory + Music) : “그 노래만 들으면 그때 그 일이 생각나”, 이런
        노래 누구든 하나쯤 있지 않나요? 매일 학교 가는 길에 들었던 그 신나는
        힙합 노래, 연인과 헤어지고 들었던 그 슬픈 발라드 노래와 같이 우리에겐
        노래에 대한 다양한 추억들이 있습니다. 3분동안 잠깐 그 당시로 추억여행을
        떠나보시는 건 어떠신가요? Mesic과 함께 당신의 추억을 가장 생생하게
        기록해보세요! 내가 있는 장소에서 지금의 순간을 음악, 사진, 메모 등
        다양한 기록으로 남겨보세요. 노래를 들으면서 사진을 보고 또 메모를 읽는
        순간 그 당시의 풍경이 눈 앞에 펼쳐지는 마법같은 경험을 하실 수 있습니다!
        **"음악과 함께 그 당시의 추억으로 떠나는 마법 같은 추억 여행" Mesic**
        입니다 🎵
      </div>
    </>
  );
}

export default IntroPage;
