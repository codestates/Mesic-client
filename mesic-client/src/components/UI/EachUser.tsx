import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";

function EachUser({ searchedEachUser, alluser }: any) {
  const state = useSelector((state: RootState) => state.userReducer);
  const { user_id, follow, token } = state.user;

  const searchedUserId: any = searchedEachUser._id;

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
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("res.data ===", res.data);
      });
  };

  return (
    <div className="eachUser">
      <div>
        {/* {follow.includes(searchedUserId) ? (
          <button onClick={patchFollow}>팔로우 취소</button>
        ) : (
          <> */}
        <button onClick={patchFollow}>팔로우</button>
        {/* </>
        )} */}
        <span>{searchedEachUser.nickname}</span>
      </div>
    </div>
  );
}

export default EachUser;
