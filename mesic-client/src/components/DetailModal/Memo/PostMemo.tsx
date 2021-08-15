import { useRef } from "react";
import { PostMemoProps } from "../../../props-types";
import NoMemo from "./modules/NoMemo";

function PostMemo({ setPostMemo }: PostMemoProps) {
  const memoInput = useRef<HTMLTextAreaElement>(null);

  const handlePostMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

export default PostMemo;
