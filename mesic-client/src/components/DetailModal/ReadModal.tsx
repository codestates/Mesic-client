import React, { useEffect, useState } from "react";
import ReadMusic from "./ReadMusic";
import ReadPhoto from "./ReadPhoto";
import ReadMemo from "./ReadMemo";
//import { read } from "fs";

function ReadModal({ readMarkerData }: any) {
  console.log(readMarkerData);
  const { video_Id, title, thumbnail } = readMarkerData.music;
  const { photo, memo } = readMarkerData;
  const [readMusic, setReadMusic] = useState<any>({
    video_Id: video_Id,
    title: title,
    thumbnail: thumbnail,
  });
  const [readImg, setReadImg] = useState<any>(photo);
  const [readMemo, setReadMemo] = useState<string>(memo);

  return (
    <div className="modal show1">
      <ReadMusic readMusic={readMusic} setReadMusic={setReadMusic} />
      <ReadPhoto readImg={readImg} setReadImg={setReadImg} />
      <ReadMemo readMemo={readMemo} setReadMemo={setReadMemo} />
    </div>
  );
}

export default ReadModal;
