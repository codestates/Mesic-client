import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {switchMode} from "../../actions/index";
import {RootState} from "../../reducers";

function Memo({memoHandler}: any) {
  const memoInput = useRef<any>();
  const memoValue = useRef<any>();
  const dispatch = useDispatch();
  const {mode} = useSelector((state: RootState) => state.userReducer).user;

  return (
    <div className="border">
      <div ref={memoValue} className={`${mode === "READ" ? "show" : "hide"}`}>
        READ MODE
      </div>
      <textarea
        ref={memoInput}
        defaultValue={`${
          mode === "POST"
            ? ""
            : mode === "UPDATE"
            ? memoValue.current?.textContent
            : ""
        }`}
        placeholder={`${mode === "POST" ? "POST 모드 입니다." : ""}`}
        onChange={memoHandler}
        className={`${mode !== "READ" ? "show" : "hide"}`}
      />
      <button
        onClick={() => {
          dispatch(switchMode("UPDATE"));
        }}
      >
        UPDATE
      </button>
      <button
        onClick={() => (memoInput.current.value = "")}
        className={`${mode !== "READ" ? "show" : "hide"}`}
      >
        RESET
      </button>
    </div>
  );
}

export default Memo;
