import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { MypageProps } from "../../props-types";

function Mypage({ openMypage, closeMypage, setOpenEditMypage }: MypageProps) {
  const { email, name, nickname, profileImg } = useSelector(
    (state: RootState) => state.userReducer.user
  );
  const clickCloseMypage = () => {
    closeMypage();
  };
  const handleOpenEditMypage = () => {
    closeMypage();
    setOpenEditMypage(true);
  };

  return (
    <>
      <div
        onClick={clickCloseMypage}
        className={`mypage-edit-background ${openMypage ? "show" : ""}`}
      />
      <div className={`mypage-edit-modal ${openMypage ? "show" : ""}`}>
        <div className="mypage-close" onClick={clickCloseMypage}>
          X
        </div>
        <div>
          <div className="mypage-title">MYPAGE</div>
          <div className="profileImg">
            <figure>
              <img className="profileImg-content" src={profileImg}></img>
            </figure>
          </div>
          <div className="mypage-info">
            <div>
              <div>Email</div>
              <div>{email}</div>
            </div>
            <div>
              <div>Name</div>
              <div>{name}</div>
            </div>
            <div>
              <div>Nickname </div>
              <div>{nickname}</div>
            </div>
          </div>
          {email !== "guest@codestates.com" && (
            <button
              className="mypage-modify-btn"
              onClick={handleOpenEditMypage}
            >
              수정
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Mypage;
