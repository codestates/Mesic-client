import React from "react";

type ModalProps = {
  memoHandler: any;
};

function Memo(props: ModalProps) {
  const {memoHandler} = props;
  return (
    <div className="border">
      <textarea onChange={memoHandler}></textarea>
    </div>
  );
}

export default Memo;
