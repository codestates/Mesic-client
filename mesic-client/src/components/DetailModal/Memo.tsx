import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {switchMode} from "../../actions/index";

function Memo({memoHandler}: any) {
  const memoInput = useRef<any>();
  const memoValue = useRef<any>();
  const dispatch = useDispatch();

  return (
    <div className="border">
      <div ref={memoValue}>READ MODE</div>
      <textarea
        ref={memoInput}
        defaultValue={memoValue.current?.textContent}
        style={{display: "block"}}
        onChange={memoHandler}
      />
      <button
        onClick={() => {
          dispatch(switchMode("UPDATE"));
        }}
      >
        UPDATE
      </button>
      <button onClick={() => (memoInput.current.value = "")}>RESET</button>
    </div>
  );
}

export default Memo;
