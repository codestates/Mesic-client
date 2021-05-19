
import React, {useState, useEffect} from "react";

import DetailModal from "../components/DetailModal/DetailModal";
import Map from "../components/UI/Map";

function MainPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleHideModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="App">
      <Map handleOpenModal={handleOpenModal}></Map>
      <DetailModal open={openModal} />
      MainPage
      <button onClick={handleOpenModal}>PIN</button>
      <button onClick={handleHideModal}>HIDE</button>
    </div>
  );
}

export default MainPage;
