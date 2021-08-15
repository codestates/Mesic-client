import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import ConfirmModal from "../../UI/ConfirmModal";
import UpdateMemo from "./modules/UpdateMemo";
import Memo from "./modules/Memo";
import NoMemo from "./modules/NoMemo";
import { ReadMemoProps } from "../../../props-types";

function ReadMemo({
  readMemo,
  setReadMemo,
  markerId,
  setPinUpdate,
}: ReadMemoProps) {
  const state = useSelector((state: RootState) => state);
  const { token } = state.userReducer.user;

  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [updatedMemo, setUpdatedMemo] = useState<string>("");
  const [savebtn, setSavebtn] = useState<boolean>(false);
  const [addedMemo, setAddedMemo] = useState<string>("");
  const addMemoInput = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setUpdatedMemo(readMemo);
  }, [readMemo]);

  const handleUpdateMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedMemo(e.target.value);
  };

  const handleAddMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSavebtn(true);
    setAddedMemo(e.target.value);
  };

  const updateReadMemo = () => {
    const data = { memo: updatedMemo };
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/memos/${markerId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
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
      .then(() => {
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

  return (
    <>
      <ConfirmModal
        confirmType="readMemo"
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
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
