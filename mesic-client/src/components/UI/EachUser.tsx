import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";

function EachUser({ searchedEachUser, alluser }: any) {
  const state = useSelector((state: RootState) => state.modeReducer);
  const { user_id } = state.user;
  const { follow } = state;

  let accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYWJiNWUxNDczZWZhMzMyNTBiM2U1ZiIsIm5hbWUiOiLqtIDsmrAg7KCVIiwiaWF0IjoxNjIxOTYyNDk2LCJleHAiOjE2MjE5Njk2OTZ9.DXPpu0hJeZfExwESvqV_lZeXeyjyll-wa_t_SHiwmsA";
  const searchedUserId: string = searchedEachUser._id;

  const patchFollow = () => {
    //const userId: string = "60abb5b1473efa33250b3e5e";
    axios
      .patch(
        `http://ec2-52-79-241-131.ap-northeast-2.compute.amazonaws.com/users/follow/${user_id}`,
        {
          id: searchedUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div className="eachUser">
      <div>
        {follow.includes(searchedEachUser._id) ? (
          <button onClick={patchFollow}>팔로우 취소</button>
        ) : (
          <>
            <button onClick={patchFollow}>팔로우</button>
          </>
        )}
        <span>{searchedEachUser.nickname}</span>
      </div>
    </div>
  );
}

export default EachUser;
