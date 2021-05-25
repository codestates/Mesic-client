import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";

function EachUser({ searchedEachUser }: any) {
  const state = useSelector((state: RootState) => state.modeReducer);

  return (
    <div className="eachUser">
      <div>
        <button>팔로우</button>
        <span>{searchedEachUser.nickname}</span>
      </div>
    </div>
  );
}

export default EachUser;
