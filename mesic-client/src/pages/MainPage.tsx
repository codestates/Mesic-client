import React, {useState, useEffect} from "react";
import DetailModal from "../components/DetailModal";

function MainPage() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <div className="App">
      <DetailModal open={openModal} />
      MainPage
      <button onClick={handleOpenModal}>PIN</button>
    </div>
  );
}

export default MainPage;
