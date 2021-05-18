import React from "react";

type ModalProps = {
  open: boolean;
};

function Memo(props: ModalProps) {
  const {open} = props;
  return <div>Memo</div>;
}

export default Memo;
