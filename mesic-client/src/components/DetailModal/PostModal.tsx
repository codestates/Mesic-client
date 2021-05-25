import React, { useEffect, useState } from "react";
import PostMusic from "./PostMusic";
import PostPhoto from "./PostPhoto";
import PostMemo from "./PostMemo";
//import { read } from "fs";

function PostModal() {
  const [postMusic, setPostMusic] = useState<any>(null);
  const [postImg, setPostImg] = useState<any>("");
  const [postMemo, setPostMemo] = useState<string>("");

  //   const postPinData = () => {
  //     //서버요청 postImg 전달
  //     setReadImg(image);
  //     setPostImg(null);
  //     setReadMemo(memo2);
  //     setPostMemo("");
  //     dispatch(switchMode("READ"));
  //   };

  return (
    <div className="modal show1">
      <PostMusic postMusic={postMusic} setPostMusic={setPostMusic} />
      <PostPhoto postImg={postImg} setPostImg={setPostImg} />
      <PostMemo postMemo={postMemo} setPostMemo={setPostMemo} />
      <div>
        <button
        //   onClick={postPinData}
        >
          PIN IT
        </button>
      </div>
    </div>
  );
}

export default PostModal;
