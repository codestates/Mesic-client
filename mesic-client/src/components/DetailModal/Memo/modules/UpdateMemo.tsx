function UpdateMemo({
  handleUpdateMemo,
  readMemo,
  updateReadMemo,
  setUpdateMode,
  setUpdatedMemo,
}: any) {
  return (
    <>
      <div className="edit-del-btn">
        <i className="fa fa-sticky-note read fa-lg" aria-hidden="true"></i>
      </div>
      <div className="textarea-outsider">
        <textarea className="input-memo" onChange={handleUpdateMemo}>
          {readMemo}
        </textarea>
      </div>
      <>
        <div className="save-cancel-btn">
          <button onClick={updateReadMemo}>저장</button>
          <button
            onClick={() => {
              setUpdateMode(false);
              setUpdatedMemo(readMemo);
            }}
          >
            취소
          </button>
        </div>
      </>
    </>
  );
}

export default UpdateMemo;
