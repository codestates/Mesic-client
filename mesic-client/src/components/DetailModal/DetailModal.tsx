import React, { useEffect, useState } from "react";
import PostMusic from "./PostMusic";
import PostPhoto from "./PostPhoto";
import PostMemo from "./PostMemo";
import ReadMusic from "./ReadMusic";
import ReadPhoto from "./ReadPhoto";
import ReadMemo from "./ReadMemo";
import { useDispatch, useSelector } from "react-redux";
import { switchMode } from "../../actions/index";
import { RootState } from "../../reducers";
//import { read } from "fs";

type detailProps = {
  open: boolean;
};

function DetailModal(props: detailProps) {
  const [postMusic, setPostMusic] = useState<any>(null);
  const [postImg, setPostImg] = useState<any>(null);
  const [postMemo, setPostMemo] = useState<string>("");
  const [readMusic, setReadMusic] = useState<any>("");
  const [readImg, setReadImg] = useState<any>(null);
  const [readMemo, setReadMemo] = useState<string>("");
  const [updateMusic, setUpdateMusic] = useState<any>("");

  const { open } = props;

  const dispatch = useDispatch();
  const { mode } = useSelector((state: RootState) => state.userReducer).user;

  const postRes = {
    music: null,
    image:
      "https://pbs.twimg.com/media/EnKtx1NXEAEoIC4?format=jpg&name=900x900",
    memo: "posted!",
  };

  const { music, image, memo } = postRes;

  const postPinData = () => {
    //서버요청 postImg 전달
    setReadImg(image);
    setPostImg(null);
    setReadMemo(memo);
    setPostMemo("");
    dispatch(switchMode("READ"));
  };

  return (
    <div className={`modal ${open ? "show1" : ""}`}>
      {mode === "POST" ? (
        <>
          <PostMusic postMusic={postMusic} setPostMusic={setPostMusic} />
          <PostPhoto
            postImg={postImg}
            setPostImg={setPostImg}
            setReadImg={setReadImg}
          />
          <PostMemo postMemo={postMemo} setPostMemo={setPostMemo} />
        </>
      ) : (
        <>
          <ReadMusic readMusic={readMusic} setReadMusic={setReadMusic} />
          <ReadPhoto readImg={readImg} setReadImg={setReadImg} />
          <ReadMemo readMemo={readMemo} setReadMemo={setReadMemo} />
        </>
      )}
      <div>
        <button
          className={`${mode !== "READ" ? "show" : "hide"}`}
          onClick={postPinData}
        >
          PIN IT
        </button>
      </div>
    </div>
  );
}

export default DetailModal;
