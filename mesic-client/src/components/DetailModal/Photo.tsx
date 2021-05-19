import {useDispatch, useSelector} from "react-redux";
import {switchMode} from "../../actions/index";
import {RootState} from "../../reducers";

function Photo({previewImg, fileSelectedHandler}: any) {
  const dispatch = useDispatch();
  return (
    <div className="border">
      photo
      <input
        type="file"
        accept="image/*"
        onChange={fileSelectedHandler}
        onClick={() => dispatch(switchMode("UPDATE"))}
      />
      <img className="img" src={previewImg} />
    </div>
  );
}

export default Photo;
