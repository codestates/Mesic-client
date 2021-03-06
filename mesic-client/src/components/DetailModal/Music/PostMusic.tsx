import { useState, useEffect } from "react";
import EditMusic from "./EditMusic";
import ConfirmModal from "../../UI/ConfirmModal";
import Music from "./modules/Music";
import NoMusic from "./modules/NoMusic";
import { PostMusicProps } from "../../../props-types";

function PostMusic({ postMusic, setPostMusic }: PostMusicProps) {
  const [openEditMusic, setOpenEditMusic] = useState<boolean>(false);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [isPlay, setIsPlay] = useState<boolean>(false);

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

  return (
    <>
      <ConfirmModal
        confirmType="postMusic"
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        setPostMusic={setPostMusic}
        setUpdateMode={setUpdateMode}
      />
      <EditMusic
        openEditMusic={openEditMusic}
        setOpenEditMusic={setOpenEditMusic}
        setUpdateMode={setUpdateMode}
        setPostUpdateMusic={setPostMusic}
        setIsPlay={setIsPlay}
      />
      <div className="music">
        {updateMode ? (
          <div className="music-content">
            <Music
              musicData={postMusic}
              setOpenEditMusic={setOpenEditMusic}
              setOpenConfirm={setOpenConfirm}
              isPlay={isPlay}
              setIsPlay={setIsPlay}
            />
          </div>
        ) : (
          <div>
            <NoMusic setOpenEditMusic={setOpenEditMusic} />
          </div>
        )}
      </div>
    </>
  );
}

export default PostMusic;
