import { useRef } from "react";
import NoMemo from "./modules/NoMemo";

function Memo({ setPostMemo }: any) {
  const memoInput = useRef<HTMLInputElement>();

  const handlePostMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostMemo(e.target.value);
  };

  return (
    <>
      <div className="memo">
        <NoMemo addMemoInput={memoInput} handleAddMemo={handlePostMemo} />
      </div>
    </>
  );
}

export default Memo;
