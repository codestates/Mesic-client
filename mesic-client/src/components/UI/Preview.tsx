import React from "react";

type ModalProps = {
  open: boolean;
};

function Preview(props: ModalProps) {
  const {open} = props;
  return <div>Preview</div>;
}

export default Preview;
