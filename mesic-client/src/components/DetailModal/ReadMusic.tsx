import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";

type ReadMusicProps = {};

function ReadMusic(props: ReadMusicProps) {
  const { mode } = useSelector((state: RootState) => state.userReducer).user;

  // const widgetUrl =
  //   "https://w.soundcloud.com/player/?url=https://soundcloud.com/blackstarmot/justin-bieber-peaches-feat-daniel-caesar-giveon&amp;";
  return <div>ReadMusic</div>;
}

export default ReadMusic;
