import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import ConfirmModal from "../UI/ConfirmModal";
import EditMusic from "../DetailModal/EditMusic";
import { readMusic } from "../../types";
import UpdateMusic from "./Music/UpdateMusic";
import Music from "./Music/Music";
import NoMusic from "./Music/NoMusic";

function ReadMusic({ readMusic, setReadMusic, markerId, setPinUpdate }: any) {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openEditMusic, setOpenEditMusic] = useState<boolean>(false);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [updateMusic, setUpdateMusic] = useState<readMusic>({
    video_Id: "",
    title: "",
    thumbnail: "",
  });

  const state = useSelector((state: RootState) => state.userReducer);
  const { token } = state.user;

  const updateReadMusic = () => {
    const data = { music: updateMusic };
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/music/${markerId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
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
      .then((res) => {
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

  const [isPlay, setIsPlay] = useState<boolean>(true);

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
        setUpdateMusic={setUpdateMusic}
        setReadMusic={setReadMusic}
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
