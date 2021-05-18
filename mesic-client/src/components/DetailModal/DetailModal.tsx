import React from "react";

type ModalProps = {
  open: boolean;
};

function DetailModal(props: ModalProps) {
  const {open} = props;
  return <div className={`modal ${open ? "show" : ""}`}>Detail Modal</div>;
}

export default DetailModal;

/*
  
*/