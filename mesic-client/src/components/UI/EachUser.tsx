import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";

function EachUser({ searchedUsers, updateFollow, setLoginController }: any) {
  const state = useSelector((state: RootState) => state.userReducer);
  const { user_id, token, isLogin } = state.user;

  // 팔로우 추가
  const patchFollow = (targetId: string) => {
    if (!isLogin) {
      setLoginController(true);
      return;
    }
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/users/follow/${user_id}`,
        {
          id: targetId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("add Follow : ", res);
        updateFollow();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="eachUser">
      <div>
        {searchedUsers ? (
          <div>
            <span>{searchedUsers.name}</span>
            <br />
            <span>{searchedUsers.email}</span>
            <button
              onClick={() => {
                patchFollow(searchedUsers._id);
              }}
            >
              팔로우
            </button>
          </div>
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default EachUser;
