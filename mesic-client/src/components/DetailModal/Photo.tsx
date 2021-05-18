import React from "react";

type ModalProps = {
  fileSelectedHandler: any;
  previewImg: any;
};

function Photo(props: ModalProps) {
  const {previewImg} = props;
  return (
    <div className="border">
      photo
      <input
        type="file"
        accept="image/*"
        onChange={props.fileSelectedHandler}
      />
      <img className="img" src={previewImg} />
    </div>
  );
}

export default Photo;
