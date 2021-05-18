import React from "react";

type ModalProps = {
  open: boolean;
};

function Photo(props: ModalProps) {
  const {open} = props;
  return <div>photo</div>;
}

export default Photo;
