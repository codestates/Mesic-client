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
    <div className="each-user-flex">
      {searchedUsers ? (
        <>
          <div>
            <span className="each-user-name">{searchedUsers.name}</span>
            <br />
            <span className="each-user-email">{searchedUsers.email}</span>
          </div>
          <button
            className="add-follow-btn"
            onClick={() => {
              patchFollow(searchedUsers._id);
            }}
          >
            +
          </button>
        </>
      ) : (
        <div className="search-not-found">검색 결과가 없습니다.</div>
      )}
    </div>
  );
}

export default EachUser;
