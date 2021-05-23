function EditMusic({
  openEditMusic,
  setOpenEditMusic,
  handleSelectMusic,
}: any) {
  // 서버로 PATCH 요청을 보내주는 함수 필요
  return (
    <div className={`background ${openEditMusic ? "show" : ""}`}>
      <div>검색된 음악 리스트</div>
      <button
        onClick={handleSelectMusic}
        value="https://w.soundcloud.com/player/?url=https://soundcloud.com/blackstarmot/justin-bieber-peaches-feat-daniel-caesar-giveon&amp;"
      >
        any song
      </button>
      <button onClick={() => setOpenEditMusic(false)}>Cancel</button>
    </div>
  );
}



export default EditMusic;
