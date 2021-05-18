import React from "react";
import Music from "./Music";
import Photo from "./Photo";
import Memo from "./Memo";

type ModalProps = {
  open: boolean;
};

function DetailModal(props: ModalProps) {
  const {open} = props;
  return (
    <div className={`modal ${open ? "show" : ""}`}>
      <Music />
      <Photo />
      <Memo />
      <button>PIN IT</button>
    </div>
  );
}

export default DetailModal;
