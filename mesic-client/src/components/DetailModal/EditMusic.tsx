import React from "react";

type EditMusicProps = {
  openEditMusic: boolean;
  handleCloseEditMusic: () => void;
  handleSelectMusic: (e: any) => void;
};

function EditMusic(props: EditMusicProps) {
  const { openEditMusic, handleCloseEditMusic, handleSelectMusic } = props;

  return (
    <div className={`background ${openEditMusic ? "show" : ""}`}>
      <div>검색된 음악 리스트</div>
      <button
        onClick={handleSelectMusic}
        value="https://w.soundcloud.com/player/?url=https://soundcloud.com/blackstarmot/justin-bieber-peaches-feat-daniel-caesar-giveon&amp;"
      >
        any song
      </button>
      <button onClick={handleCloseEditMusic}>Cancel</button>
    </div>
  );
}

export default EditMusic;
