import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import ConfirmModal from "../../UI/ConfirmModal";
import UpdateMemo from "./modules/UpdateMemo";
import Memo from "./PostMemo";
import NoMemo from "./modules/NoMemo";

function ReadMemo({ readMemo, setReadMemo, markerId, setPinUpdate }: any) {
  const state = useSelector((state: RootState) => state);
  const { token } = state.userReducer.user;

  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [updatedMemo, setUpdatedMemo] = useState<string>("");
  const [savebtn, setSavebtn] = useState<boolean>(false);
  const [addedMemo, setAddedMemo] = useState<string>("");
  const addMemoInput = useRef<HTMLInputElement>();

  const handleUpdateMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedMemo(e.target.value);
  };
  const handleAddMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSavebtn(true);
    setAddedMemo(e.target.value);
  };
  const updateReadMemo = () => {
    const data = { memo: updatedMemo };
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/memos/${markerId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        getUpdatedPin();
        setUpdateMode(false);
      })
      .catch((err) => console.log(err));
  };
  const addReadMemo = () => {
    const data = { memo: addedMemo };
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/memos/${markerId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        getUpdatedPin();
        setSavebtn(false);
        setAddedMemo("");
      })
      .catch((err) => console.log(err));
  };

  const getUpdatedPin = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/pins/pins/${markerId}`)
      .then((res) => {
        setReadMemo(res.data.memo);
        setPinUpdate(true);
      });
  };

  useEffect(() => {
    setUpdatedMemo(readMemo);
  }, [readMemo]);

  return (
    <>
      <ConfirmModal
        confirmType="readMemo"
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        setReadMemo={setReadMemo}
      />
      <div className="memo">
        {updateMode && (
          <UpdateMemo
            handleUpdateMemo={handleUpdateMemo}
            readMemo={readMemo}
            updateReadMemo={updateReadMemo}
            setUpdateMode={setUpdateMode}
            setUpdatedMemo={setUpdatedMemo}
          />
        )}
        {updateMode || (
          <div>
            {readMemo.length > 0 ? (
              <Memo readMemo={readMemo} setUpdateMode={setUpdateMode} />
            ) : (
              <NoMemo
                addMemoInput={addMemoInput}
                handleAddMemo={handleAddMemo}
                addReadMemo={addReadMemo}
                savebtn={savebtn}
                setSavebtn={setSavebtn}
                setAddedMemo={setAddedMemo}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ReadMemo;
