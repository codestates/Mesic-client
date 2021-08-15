import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import ConfirmModal from "../../UI/ConfirmModal";
import EditMusic from "./EditMusic";
import { musicData } from "../../../state-types";
import UpdateMusic from "./modules/UpdateMusic";
import Music from "./modules/Music";
import NoMusic from "./modules/NoMusic";
import { ReadMusicProps } from "../../../props-types";

function ReadMusic({
  readMusic,
  setReadMusic,
  markerId,
  setPinUpdate,
}: ReadMusicProps) {
  const { token } = useSelector((state: RootState) => state.userReducer.user);

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openEditMusic, setOpenEditMusic] = useState<boolean>(false);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [updateMusic, setUpdateMusic] = useState<musicData>({
    video_Id: "",
    title: "",
    thumbnail: "",
  });
  const [isPlay, setIsPlay] = useState<boolean>(true);

  const updateReadMusic = () => {
    const data = { music: updateMusic };
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/music/${markerId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        getUpdatedPin();
      });
  };

  const deleteReadMusic = () => {
    const data = {
      music: {
        video_Id: "",
        title: "",
        thumbnail: "",
      },
    };
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/music/${markerId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        getUpdatedPin();
      });
  };

  const getUpdatedPin = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/pins/pins/${markerId}`)
      .then((res) => {
        setReadMusic(res.data.music);
        setPinUpdate(true);
        setUpdateMode(false);
        setOpenConfirm(false);
        setIsPlay(true);
      });
  };

  const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement =>
    input !== null && input.tagName === "IFRAME";

  useEffect(() => {
    let frame = document.getElementById("ytplayer");
    if (isPlay) {
      if (isIFrame(frame) && frame.contentWindow) {
        frame.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
      }
    } else {
      if (isIFrame(frame) && frame.contentWindow) {
        frame.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      }
    }
  }, [isPlay]);

  useEffect(() => {
    if (updateMode && isPlay) {
      setIsPlay(false);
    }
    return;
  }, [updateMode]);

  return (
    <>
      <ConfirmModal
        confirmType="readMusic"
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        setReadMusic={setReadMusic}
        updateMode={updateMode}
        setUpdateMusic={setUpdateMusic}
        deleteReadMusic={deleteReadMusic}
      />
      <EditMusic
        openEditMusic={openEditMusic}
        setOpenEditMusic={setOpenEditMusic}
        setUpdateMode={setUpdateMode}
        setPostUpdateMusic={setUpdateMusic}
        setIsPlay={setIsPlay}
      />
      <div className="music">
        {updateMode && (
          <UpdateMusic
            updateMusic={updateMusic}
            isPlay={isPlay}
            setIsPlay={setIsPlay}
            setUpdateMode={setUpdateMode}
            setUpdateMusic={setUpdateMusic}
            updateReadMusic={updateReadMusic}
          />
        )}
        {updateMode || (
          <div>
            {readMusic.video_Id.length > 0 ? (
              <Music
                setOpenEditMusic={setOpenEditMusic}
                setOpenConfirm={setOpenConfirm}
                musicData={readMusic}
                isPlay={isPlay}
                setIsPlay={setIsPlay}
              />
            ) : (
              <NoMusic setOpenEditMusic={setOpenEditMusic} />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ReadMusic;
