import pauseImg from "../../../images/pause.png";
import playImg from "../../../images/play.png";

function UpdateMusic({
  updateMusic,
  isPlay,
  setIsPlay,
  setUpdateMode,
  setUpdateMusic,
  updateReadMusic,
}: any) {
  return (
    <>
      <div className="update-mode-post-icon">
        <i className="fa fa-headphones fa-lg" aria-hidden="true" />
      </div>
      <div className="widget-outsider">
        <img className="thumbnail-cd" src={updateMusic.thumbnail} />
        <div className="title-cd-hidden">
          <div className="title-cd">{updateMusic.title}</div>
        </div>
        <iframe
          src={`https://www.youtube.com/embed/ ${
            updateMusic.video_Id &&
            updateMusic.video_Id +
              "?modestbranding=1&enablejsapi=1&autoplay=0&loop=1&playlist=" +
              updateMusic.video_Id
          }`}
          id="ytplayer"
          frameBorder="0"
          allow="autoplay"
        />
        <div onClick={() => setIsPlay(isPlay ? false : true)}>
          <img className="play-pause" src={isPlay ? pauseImg : playImg} />
        </div>
      </div>
      <div className="save-cancel-btn">
        <button onClick={updateReadMusic}>저장</button>
        <button
          onClick={() => {
            setUpdateMode(false);
            setUpdateMusic({
              video_Id: "",
              title: "",
              thumbnail: "",
            });
            setIsPlay(true);
          }}
        >
          취소
        </button>
      </div>
    </>
  );
}

export default UpdateMusic;
