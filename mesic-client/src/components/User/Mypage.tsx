import React from "react";

type MypageProps = {
  openMypage: boolean;
  closeMypage: () => void;
};

function Mypage(props: MypageProps) {
  const { openMypage, closeMypage } = props;

  const clickCloseMypage = () => {
    closeMypage();
  };

  return (
    <div className={`mypage-background ${openMypage ? "show1" : ""}`}>
      <div className="mypage-modal">
        <div className="mypage-close" onClick={clickCloseMypage}>
          X
        </div>
        <div className="mypage-content">
          <div className="mypage-title">MYPAGE</div>
          <div>아이디: port757</div>
          <div>닉네임: secret</div>
          <div>이름: secret</div>
          <div>
            <button>Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
