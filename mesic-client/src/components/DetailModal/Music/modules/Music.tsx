import pauseImg from "../../../images/pause.png";
import playImg from "../../../images/play.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reducers";

function Music({
  setOpenEditMusic,
  setOpenConfirm,
  musicData,
  isPlay,
  setIsPlay,
}: any) {
  const state = useSelector((state: RootState) => state);
  const { mode } = state.modeReducer.user;
  const { isLogin } = state.userReducer.user;

  return (
    <>
      {isLogin && mode !== "WATCH" ? (
        <div className="edit-del-btn">
          <i className="fa fa-headphones fa-lg" aria-hidden="true" />
          <div>
            <i
              className="fas fa-pencil-alt"
              aria-hidden="true"
              onClick={() => setOpenEditMusic(true)}
            />
            <i
              className="fa fa-trash"
              aria-hidden="true"
              onClick={() => setOpenConfirm(true)}
            />
          </div>
        </div>
      ) : (
        <div className="post-icon">
          <i className="fa fa-headphones fa-lg" aria-hidden="true" />
        </div>
      )}
      <div className="widget-outsider">
        <img className="thumbnail-cd" src={musicData.thumbnail} />
        <div className="title-cd-hidden">
          <div className="title-cd">{musicData.title}</div>
        </div>
        <iframe
          src={`https://www.youtube.com/embed/ ${
            musicData.video_Id &&
            musicData.video_Id +
              "?modestbranding=1&enablejsapi=1&autoplay=1&loop=1&playlist=" +
              musicData.video_Id
          }`}
          id="ytplayer"
          frameBorder="0"
          allow="autoplay"
        />
        <div>
          <img
            className="play-pause"
            src={isPlay ? pauseImg : playImg}
            onClick={() => setIsPlay(isPlay ? false : true)}
          />
        </div>
      </div>
    </>
  );
}

export default Music;
